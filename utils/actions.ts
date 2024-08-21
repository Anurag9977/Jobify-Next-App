"use server";

import { auth } from "@clerk/nextjs/server";
import { CreateOrEditJobType, jobSchema } from "./schema";
import { redirect } from "next/navigation";
import db from "@/utils/db";
import { Job, Prisma } from "@prisma/client";
import dayjs from "dayjs";

function getAuthUser() {
  const { userId } = auth();
  if (!userId) redirect("/");
  return userId;
}

export async function CreateJob(job: CreateOrEditJobType) {
  const clerkID = getAuthUser();
  try {
    const validatedFields = jobSchema.safeParse(job);
    if (validatedFields.success) {
      const jobDetails = validatedFields.data;
      const newJob = await db.job.create({
        data: {
          clerkID,
          ...jobDetails,
        },
      });
      return newJob;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAllJobs({
  search,
  status,
  mode,
  page = 1,
  limit = 10,
}: {
  search?: string;
  status?: string;
  mode?: string;
  page?: number;
  limit?: number;
}): Promise<{
  jobs: Job[];
  page: number;
  totalJobs: number;
  totalPages: number;
}> {
  const clerkID = getAuthUser();
  const skip = (page - 1) * limit;
  let whereClause: Prisma.JobWhereInput = {
    clerkID,
  };
  if (search) {
    whereClause = {
      ...whereClause,
      OR: [
        {
          position: {
            contains: search,
          },
        },
        {
          company: {
            contains: search,
          },
        },
        {
          location: {
            contains: search,
          },
        },
      ],
    };
  }
  if (status && status !== "all") {
    whereClause = {
      ...whereClause,
      status,
    };
  }
  if (mode && mode !== "all") {
    whereClause = {
      ...whereClause,
      mode,
    };
  }
  try {
    const jobs = await db.job.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });
    const totalJobs = await db.job.count({
      where: whereClause,
    });
    const totalPages = Math.ceil(totalJobs / limit);
    return { jobs, page, totalJobs, totalPages };
  } catch (error) {
    console.log(error);
    return { jobs: [], page: 1, totalJobs: 0, totalPages: 0 };
  }
}

export async function deleteJob({
  jobID,
}: {
  jobID: string;
}): Promise<Job | null> {
  const clerkID = getAuthUser();
  try {
    const deletedJob = await db.job.delete({
      where: {
        id: jobID,
        clerkID,
      },
    });
    return deletedJob;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getSingleJob({
  jobID,
}: {
  jobID: string;
}): Promise<Job | null> {
  const clerkID = getAuthUser();
  try {
    const job = await db.job.findUnique({
      where: {
        id: jobID,
        clerkID,
      },
    });
    if (!job) {
      redirect("/jobs");
    }
    return job;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function editJob({
  jobID,
  job,
}: {
  jobID: string;
  job: CreateOrEditJobType;
}): Promise<Job | null> {
  const clerkID = getAuthUser();
  try {
    const validatedFields = jobSchema.safeParse(job);
    if (validatedFields.success) {
      const updatedJobDetails = validatedFields.data;
      const updatedJob = await db.job.update({
        where: {
          id: jobID,
          clerkID,
        },
        data: {
          clerkID,
          ...updatedJobDetails,
        },
      });
      return updatedJob;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getJobStats(): Promise<{
  offer: number;
  interview: number;
  declined: number;
}> {
  const clerkID = getAuthUser();
  let defaultStats = { offer: 0, interview: 0, declined: 0 };
  try {
    const stats = await db.job.groupBy({
      by: ["status"],
      where: {
        clerkID,
        status: {
          notIn: ["pending"],
        },
      },
      _count: {
        status: true,
      },
    });
    const statsObject = stats.reduce((total, current) => {
      total[current.status] = current._count.status;
      return total;
    }, {} as Record<string, number>);

    defaultStats = { ...defaultStats, ...statsObject };

    return defaultStats;
  } catch (error) {
    console.log(error);
    return defaultStats;
  }
}

export async function getChartsData() {
  const clerkID = getAuthUser();
  const lastSixMonthsDate: Date = dayjs().subtract(6, "months").toDate();
  let defaultChartsData: Array<{
    month: string;
    offer: number;
    interview: number;
    declined: number;
  }> = [];
  try {
    const rawData = await db.job.groupBy({
      by: ["status", "createdAt"],
      where: {
        clerkID,
        status: {
          notIn: ["pending"],
        },
        createdAt: {
          gte: lastSixMonthsDate,
        },
      },
      _count: {
        status: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    rawData.map((item) => {
      const { _count, createdAt, status } = item;
      const monthYear = dayjs(createdAt).format("MMM YY");
      const findMonthYear: any = defaultChartsData.find(
        (curr) => curr?.month === monthYear
      );
      if (findMonthYear) {
        findMonthYear[status] += _count.status;
      } else {
        let tempObject: any = {
          month: monthYear,
          offer: 0,
          interview: 0,
          declined: 0,
        };
        tempObject[status] += _count.status;
        defaultChartsData.push({
          ...tempObject,
        });
      }
    });
    return defaultChartsData;
  } catch (error) {
    console.log(error);
    return defaultChartsData;
  }
}
