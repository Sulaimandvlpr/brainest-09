import { MongoClient } from 'mongodb';
 
const uri = 'mongodb://localhost:27017';
export const client = new MongoClient(uri);
export const db = client.db('irt_tryout');
export const questions = db.collection('questions_irt');
export const attempts = db.collection('user_attempts'); 