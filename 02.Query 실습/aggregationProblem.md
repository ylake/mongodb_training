# Problem
sample_traning database의 grades collection을 이용하고
class_id별 exam과 quiz에 대한 평균값을 구한다.
exam과 quiz의 평균값은 배열 필드안에 넣어서 저장한다.

## result example
```javascript
[
  {
    _id: 500,
    scores: [
      { k: 'exam', v: 45.04082924638036 },
      { k: 'quiz', v: 51.35603805996617 }
    ]
  },
  {
    _id: 499,
    scores: [
      { k: 'exam', v: 52.234488613263466 },
      { k: 'quiz', v: 48.96268506750967 }
    ]
  },
  {
    _id: 498,
    scores: [
      { k: 'exam', v: 48.51775335555769 },
      { k: 'quiz', v: 53.827492248151465 }
    ]
  },
  {
    _id: 497,
    scores: [
      { k: 'exam', v: 50.80561533355925 },
      { k: 'quiz', v: 51.27682967858154 }
    ]
  },
  {
    _id: 496,
    scores: [
      { k: 'exam', v: 47.28546854417578 },
      { k: 'quiz', v: 50.30975687853305 }
    ]
  }
]
```


## solution 1

2개 필드를 grouping하고 다시 grouping해서 원하는 결과를 얻는다.

```javascript
db.grades.aggregate([
	{
		$unwind: "$scores"
	},
	{
		$match: {
			"scores.type": {
				$in: ['exam', 'quiz']
			}
		}
	},
	{
		$group: {
			_id: {
				class_id: "$class_id",
				type: "$scores.type"
			},
			avg_score: {
				$avg: "$scores.score"
			}
		}
	},
	{
		$group: {
			_id: "$_id.class_id",
			scores: {
				$push: {
					type: "$_id.type",
					avg_score: "$avg_score"
				}
			}
		}
	},
	{
		$sort: {
			_id: -1
		}
	},
	{
		$limit: 5
	}
])
```

## solution 2

미리 원하는 조건으로 배열을 필터링하고 배열필드에 score에대한 모든 값을 넣고 나중에 평균을 구하는 방법

```javascript
db.grades.aggregate([
	{
		$addFields: {
			tmp_scores: {
				$filter: {
					input: "$scores",
					as: "scores_var",
					cond: {
						$or: [
							{$eq: ["$$scores_var.type", 'exam']},
							{$eq: ["$$scores_var.type", 'quiz']}
						]
					}
				}
			}
		}
	},
	{
		$unset: ["scores", "student_id"]
	},
	{
		$unwind: "$tmp_scores"
	},
	{
		$group: {
			_id: "$class_id",
			exam_scores: {
				$push: {
					$cond: {
						if: {
							$eq: ["$tmp_scores.type", 'exam']
						},
						then: "$tmp_scores.score",
						else: "$$REMOVE"
					}
				}
			},
			quiz_scores: {
				$push: {
					$cond: {
						if: {
							$eq: ["$tmp_scores.type", 'quiz']
						},
						then: "$tmp_scores.score",
						else: "$$REMOVE"
					}
				}
			}
		}
	},
	{
		$project: {
			_id: 1,
			scores: {
				$objectToArray: {
					exam: {
						$avg: "$exam_scores"
					},
					quiz: {
						$avg: "$quiz_scores"
					}
				}
			}
		}
	},
	{
		$sort: {
			_id: -1
		}
	},
	{
		$limit: 5
	}
])
```
