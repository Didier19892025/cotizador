import UsersList from "@/components/users/UsersList";
import { getAllUsers } from "@/actions/usersActions";

export  default async function UsersPage() {

    const users = await getAllUsers();
    console.log('users', users);
  return (
    <>
        <UsersList users={users}/>
    </>
  )
}
