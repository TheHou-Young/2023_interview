const DEFAULT = {
  page: 1,
  size: 10,
}

const pagination = async ({ model, matchPip, listPip, options = DEFAULT }) => {
  const { page = DEFAULT.page, size = DEFAULT.size } = options
  const [data] = await model?.aggregate?.([
    {
      $match: matchPip,
    },
    {
      $facet: {
        list: [
          ...listPip,
          { $skip: (page - DEFAULT.page) * size },
          { $limit: size },
        ],
        count: [
          {
            $count: 'count',
          },
        ],
      },
    },
    {
      $unwind: '$count',
    },
    {
      $project: {
        count: '$count.count',
        list: '$list',
      },
    },
  ])
  const { list = [], count = 0 } = data ?? {}
  return { list, count }
}

module.exports = pagination
