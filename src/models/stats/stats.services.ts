import { prisma } from '../../config/prisma.db';

const stats = async () => {
  return await prisma.$transaction(async (tx) => {
    const blogStat = await tx.blog.aggregate({
      _count: true,
      _sum: {
        views: true,
      },
      _avg: {
        views: true,
      },
      _max: {
        views: true,
      },
      _min: {
        views: true,
      },
    });

    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const lastWeekBlogs = await tx.blog.count({
      where: {
        createdAt: {
          gte: lastWeek,
        },
      },
    });

    const lastWeekViews = await tx.blog.aggregate({
      where: {
        createdAt: {
          gte: lastWeek,
        },
      },
      _sum: {
        views: true,
      },
    });

    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const lastMonthBlogs = await tx.blog.count({
      where: {
        createdAt: {
          gte: lastMonth,
        },
      },
    });

    const lastMonthViews = await tx.blog.aggregate({
      where: {
        createdAt: {
          gte: lastMonth,
        },
      },
      _sum: {
        views: true,
      },
    });

    const totalProjects = await tx.project.count();
    const lastWeekProjects = await tx.project.count({
      where: {
        createdAt: {
          gte: lastWeek,
        },
      },
    });

    const lastMonthProjects = await tx.project.count({
      where: {
        createdAt: {
          gte: lastMonth,
        },
      },
    });

    const totalCompltedProjects = await tx.project.count({
      where: {
        status: 'completed',
      },
    });

    const totalInProgressProjects = await tx.project.count({
      where: {
        status: 'in_progress',
      },
    });

    const totalPlannedProjects = await tx.project.count({
      where: {
        status: 'planned',
      },
    });

    const totalPublishedBlogs = await tx.blog.count({
      where: {
        status: 'published',
      },
    });

    const totalDraftBlogs = await tx.blog.count({
      where: {
        status: 'draft',
      },
    });

    return {
      stats: {
        totalBlogs: blogStat._count ?? 0,
        totalPublishedBlogs,
        totalDraftBlogs,
        lastWeekBlogs,
        lastMonthBlogs,
        totalViews: blogStat._sum.views ?? 0,
        avgViews: blogStat._avg.views ?? 0,
        maxViews: blogStat._max.views ?? 0,
        minViews: blogStat._min.views ?? 0,
        lastWeekViews: lastWeekViews._sum.views,
        lastMonthViews: lastMonthViews._sum.views,
        totalProjects,
        lastWeekProjects,
        lastMonthProjects,
        totalCompltedProjects,
        totalInProgressProjects,
        totalPlannedProjects,
      },
    };
  });
};

export const statsServices = {
  stats,
};
