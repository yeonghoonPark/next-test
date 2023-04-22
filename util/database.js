import { MongoClient } from "mongodb";

const url = `${process.env.NEXT_PUBLIC_MONGODB_URI}`;

// useNewUrlParser이 무엇을 설정하는지?
const options = { useNewUrlParser: true };
let connectDB;

if (!url) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // development의 경우 global._mongo라는 변수에 MongoDB와 연결하는 로직을 담아놓고 재사용하라는 의미
  // 이유 : 서버에 계속 요청하는 과부하와 그에 따른 오류를 줄이기 위해서
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}

export { connectDB };
