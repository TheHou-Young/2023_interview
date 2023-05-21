const lodash = require('lodash')

const DEFAULT = {
  page: 1,
  size: 10,
}

const pagination = async ({ model, matchPip, listPip, options = DEFAULT }) => {
  const { page = DEFAULT.page, size = DEFAULT.size } = options
  const newPage = lodash.isNumber(page) ? page : Number(page)
  const newSize = lodash.isNumber(size) ? page : Number(size)
  const [data] = await model?.aggregate?.([
    {
      $match: matchPip,
    },
    {
      $facet: {
        list: [
          ...listPip,
          { $skip: (newPage - DEFAULT.page) * newSize },
          { $limit: newSize },
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
