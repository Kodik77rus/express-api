
db = new Mongo().getDB('admin');

db.createUser({
  user: 'admin',
  pwd: 'root',
  roles: [{
    role: 'clusterAdmin',
    db: 'admin'
  }]
})

db.auth('admin', 'root');

db = db.getSiblingDB('firstAPI');

db.createUser({
  user: 'user',
  pwd: 'pwd',
  roles: [{
    role: 'readWrite',
    db: 'firstAPI'
  }]
})


db.createCollection('ads')

db.ads.insert([
  {title:"crutches",description:"slightly worn but in good condition",price:"77",imgURLs: ["https://mainImg","https://secondImg","https://thirdImg"]},
  {title:"test_1",description:"test_1",price:"77",imgURLs: ["https://mainImg","https://secondImg","https://thirdImg"]},
  {title:"test_2",description:"test_2",price:"567",imgURLs: ["https://mainImg","https://thirdImg"]},
  {title:"test_3",description:"test_3",price:"345",imgURLs: ["https://mainImg"]},
  {title:"test_4",description:"test_4",price:"772345",imgURLs: ["https://mainImg","https://secondImg"]},
  {title:"test_5",description:"test_5",price:"2345",imgURLs: ["https://mainImg","https://secondImg","https://thirdImg"]},
  {title:"test_6",description:"test_6",price:"77",imgURLs: ["https://mainImg"]},
  {title:"test_7",description:"test_7",price:"5678",imgURLs: ["https://mainImg","https://secondImg","https://thirdImg"]},
  {title:"test_8",description:"test_8",price:"77",imgURLs: ["https://mainImg","https://secondImg","https://thirdImg"]},
  {title:"test_9",description:"test_9",price:"3425",imgURLs: ["https://mainImg"]},
  {title:"test_10",description:"test_10",price:"213",imgURLs: ["https://mainImg","https://secondImg"]},
  {title:"test_11",description:"test_11",price:"879",imgURLs: ["https://mainImg","https://secondImg"]},
  {title:"test_12",description:"test_12",price:"6789",imgURLs: ["https://mainImg","https://secondImg","https://thirdImg"]},
  {title:"test_13",description:"test_13",price:"2435",imgURLs: ["https://mainImg","https://secondImg","https://thirdImg"]},
  {title:"test_14",description:"test_14",price:"6547",imgURLs: ["https://mainImg"]},
  {title:"test_15",description:"test_15",price:"5678",imgURLs: ["https://mainImg","https://secondImg"]},
  {title:"test_16",description:"test_16",price:"1234",imgURLs: ["https://mainImg"]},
  {title:"test_17",description:"test_17",price:"3456",imgURLs: ["https://mainImg","https://secondImg","https://thirdImg"]},
  {title:"test_18",description:"stest_18",price:"2345",imgURLs: ["https://mainImg","https://secondImg","https://thirdImg"]},
  {title:"test_19",description:"test_19",price:"2345",imgURLs: ["https://mainImg"]},
  {title:"test_20",description:"test_20",price:"67585",imgURLs: ["https://mainImg"]},
])