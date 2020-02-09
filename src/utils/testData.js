export const TDData = (orderName)=>{
  return `{
    "order" : { 
      "modelName" : "羽绒服",
      "style" : "双排扣西服",
      "type" : "西服",
      "orderName" : "工商银行${orderName}",
      "subName" : "上衣",
      "orderID" : "${orderName}",
      "clothes":4,
      "isAlarm":0,
      "depiction" : "",
      "schemeType" : "",
      "overTime" : "",
      "customerName" : "工商银行",
      "timeStamp" : "" 
    },
    "url" : "",
    "fabric" : [ 
       { 
        "name" : "面料",
        "id" : "ML-1735",
        "code" : "深灰色暗纹华达呢",
        "color" : "金色暗纹",
        "width" : 0.000,
        "dir":0,
        "xShark" : 0.000,
        "yShark" : 0.000,
        "xWidth" : 0.000,
        "yWidth" : 0.000,
        "amount" : 0.000 
      },
       { 
        "name" : "里料",
        "id" : "LL553",
        "code" : "白棉布",
        "color" : "",
        "width" : 0.000,
        "dir":0,
        "xShark" : 0.000,
        "yShark" : 0.000,
        "xWidth" : 0.000,
        "yWidth" : 0.000,
        "amount" : 0.000 
      },
       { 
        "name" : "衬料",
        "id" : "CL355",
        "code" : "纸衬",
        "color" : "",
        "width" : 90.000,
        "dir":0,
        "xShark" : 0.000,
        "yShark" : 0.000,
        "xWidth" : 0.000,
        "yWidth" : 0.000,
        "amount" : 0.000 
      } 
    ],
    "measureName" : [ 
      "胸围",
      "腰围",
      "衣长" 
    ],
    "person" : [ 
       { 
        "id":11501,
        "name" : "王刚",
        "phone" : "联系电话",
        "remark" : "",
        "copys":2,
        "sizeName" : "170",
        "meaValue" : [ 
          90.000,
          100.000,
          50.000 
        ] 
      },
       { 
        "id":11502,
        "name" : "张国立",
        "phone" : "联系电话",
        "remark" : "",
        "copys":1,
        "sizeName" : "170",
        "meaValue" : [ 
          90.000,
          80.000,
          55.000 
        ] 
      },
       { 
        "id":1503,
        "name" : "张铁林",
        "phone" : "联系电话",
        "remark" : "",
        "copys":1,
        "sizeName" : "170",
        "meaValue" : [ 
          95.000,
          85.000,
          60.000 
        ] 
      } 
    ]
  }`
}

export const GDData = (name)=>{
 return  `{
    "id" : "${name}",
    "name" : "Test${name}",
    "url" : "www.etsystem.cn/order/2435433",
    "style" : "羽绒服",
    "type" : "西服",
    "sizeName" : "100/75",
    "copys":2,
    "person" : { 
      "name" : "伍思凯",
      "phone" : "13566578978",
      "remark" : "老客户" 
    },
    "fabric" : [ 
       { 
        "id" : "ZM-173553",
        "name" : "主面料",
        "width" : 156.000,
        "details" : "蓝色牛仔",
        "len_shrinkage" : 0.000,
        "width_shrinkage" : 0.000,
        "len_grid" : 0.000,
        "width_grid" : 0.000,
        "gap" : 0.000,
        "price" : 30.000,
        "amount" : 0.000 
      },
       { 
        "id" : "ZM-173553",
        "name" : "主面料",
        "width" : 156.000,
        "details" : "蓝色牛仔",
        "len_shrinkage" : 0.000,
        "width_shrinkage" : 0.000,
        "len_grid" : 0.000,
        "width_grid" : 0.000,
        "gap" : 0.000,
        "price" : 30.000,
        "amount" : 0.000 
      } 
    ],
    "number" : [ 
       { 
        "name" : "胸围",
        "val" : 95.000 
      },
       { 
        "name" : "肩宽",
        "val" : 50.000 
      },
       { 
        "name" : "衣长",
        "val" : 60.000 
      } 
    ],
    "select" : [ 
       { 
        "name" : "领型",
        "val" : "方领" 
      },
       { 
        "name" : "下摆",
        "val" : "直下摆" 
      },
       { 
        "name" : "袖口绣花",
        "val" : "思凯" 
      } 
    ],
    "part" : [ 
       { 
        "name" : "领",
        "val" : "方领" 
      },
       { 
        "name" : "前片",
        "val" : "直下摆前片" 
      },
       { 
        "name" : "后片",
        "val" : "直下摆后片" 
      } 
    ]
  }`
}

export const DHData = (name)=>{
return `{
	"id" : "Test${name}",
	"name" : "Test${name}",
	"style" : "羽绒服",
	"type" : "西服",
	"url" : "mes.etsystem.cn/order/Test${name}",
	"quantity":210,
	"size_type":1,
	"size_name" : { 
		"base" : "M",
		"name" : [ 
			"S",
			"M",
			"L" 
		] 
	},
	"size" : [ 
		 { 
			"name" : "胸围",
			"tolerance" : 0.000,
			"measures" : [ 
				-1.000,
				0.000,
				1.000 
			] 
		},
		 { 
			"name" : "腰围",
			"tolerance" : 0.000,
			"measures" : [ 
				-1.000,
				0.000,
				1.000 
			] 
		},
		 { 
			"name" : "衣长",
			"tolerance" : 0.000,
			"measures" : [ 
				-2.000,
				0.000,
				2.000 
			] 
		},
		 { 
			"name" : "袖长",
			"tolerance" : 0.000,
			"measures" : [ 
				-1.500,
				0.000,
				1.500 
			] 
		} 
	],
	"version" : [ 
		 { 
			"name" : "黑色",
			"downloadURL" : "Model/123.prj",
			"fabric" : [ 
				 { 
					"name" : "主面料",
					"id" : "ZM-173553",
					"width" : 156.000,
					"details" : "黑色牛仔",
					"len_shrinkage" : 0.000,
					"width_shrinkage" : 0.000,
					"price" : 30.000,
					"amount" : 0.000 
				},
				 { 
					"name" : "里料",
					"id" : "ZM-173553",
					"width" : 156.000,
					"details" : "白棉布",
					"len_shrinkage" : 0.000,
					"width_shrinkage" : 0.000,
					"price" : 30.000,
					"amount" : 0.000 
				} 
			],
			"quantity" : [ 
				100,
				120,
				80 
			] 
		},
		 { 
			"name" : "白色",
			"downloadURL" : "Model/456.prj",
			"fabric" : [ 
				 { 
					"name" : "主面料",
					"id" : "ZM-173553",
					"width" : 156.000,
					"details" : "蓝色牛仔",
					"len_shrinkage" : 0.000,
					"width_shrinkage" : 0.000,
					"price" : 30.000,
					"amount" : 0.000 
				},
				 { 
					"name" : "里料",
					"id" : "ZM-173553",
					"width" : 156.000,
					"details" : "白棉布",
					"len_shrinkage" : 0.000,
					"width_shrinkage" : 0.000,
					"price" : 30.000,
					"amount" : 0.000 
				} 
			],
			"quantity" : [ 
				20,
				70,
				120 
			] 
		} 
	],
	"fabric" : [ 
		 { 
			"name" : "主面料",
			"id" : "ZM-173553",
			"width" : 156.000,
			"details" : "蓝色牛仔",
			"len_shrinkage" : 0.000,
			"width_shrinkage" : 0.000,
			"price" : 30.000,
			"amount" : 0.000 
		},
		 { 
			"name" : "里料",
			"id" : "LB-173553",
			"width" : 156.000,
			"details" : "蓝色牛仔",
			"len_shrinkage" : 0.000,
			"width_shrinkage" : 0.000,
			"price" : 30.000,
			"amount" : 0.000 
		} 
	]
}`
}