import UsersList from "@/components/users/UsersList";
import { getAllUsers } from "@/server/usersActions";

export  default async function UsersPage() {

    const users = await getAllUsers();
  return (
    <>
        <UsersList users={users}/>
    </>
  )
}
