import UsersList from "@/components/users/UsersList";
import { getAllUsers } from "@/server/usersActions";

export  default async function UsersPage() {

    const users = await getAllUsers();
  return (
    <>
    <main>
        <UsersList users={users}/>
    </main>
    </>
  )
}
