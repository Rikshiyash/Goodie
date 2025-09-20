const { DB_USERNAME, DB_PASSWORD } = process.env;

export const connectionStr = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster5.8sm3zuh.mongodb.net/restoDB?retryWrites=true&w=majority&appName=Cluster5`;
