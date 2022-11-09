# account에 대해서 symbol로 그룹핑
# 회사 거래별 누적 수량
# 그중에서 상위 3개
# msft에 대한 값만 추출
# customer 정보와 account 정보도 함께 출력

db.transactions.aggregate([
	{
		$unwind: "$transactions"
	},
	{
		$group: {
			_id: {
				account_id: "$account_id",
				symbol: "$transactions.symbol"
			},
			currentHolding: {
				$sum: {
					$cond: [
						{
							$eq: [
								"$transactions.transaction_code",
								"buy"
							]
						},
						"$transactions.amount",
						{
							$multiply: [
								"$transactions.amount",
								-1
							]
						}
					]
				}
			}
		}
	},
	{
		$match: {
			"_id.symbol": 'msft'
		}
	},
	{
		$sort: {
			currentHolding: -1
		}
	},
	{
		$limit: 3
	},
	{
		$lookup: {
			from: "accounts",
			localField: "_id.account_id",
			foreignField: "account_id",
			as: "account_info",
			pipeline: [
				{
					$lookup: {
						from: "customers",
						localField: "account_id",
						foreignField: "accounts",
						as: "customer_info",
						pipeline: [
							{
								$project: {
									"username": 1,
									"_id": 0
								}
							}
						]
					}
				},
				{
					$project: {
						_id: 0,
						account_id: 0
					}
				},
				{
					$unwind: "$customer_info"
				}
			]
		}
	},
	{
		$unwind: "$account_info"
	},
	{
		$project: {
			_id: 0,
			user: "$account_info.customer_info.username",
			account_id: "$_id.account_id",
			symbol: "$_id.symbol",
			currentHolding: 1,
			account_info: {
				limit: 1,
				products: 1
			}
		}
	}
]).explain('executionStats')
