import connectionToDatabase from "@/lib/mongodb";
import User from "@/models/User";
export default async function Users() {
    await connectionToDatabase();
    const users = await User.find();

    return <div>{JSON.stringify(users)}</div>;
}