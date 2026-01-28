import { Avatar, AvatarFallback, AvatarImage, AvatarBadge } from "@/components/ui/avatar";

export const NavBar = () => {
  return (
    <>
      <div className="flex justify-between m-8">
        <h1>Sandeshan</h1>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>User</AvatarFallback>
          <AvatarBadge className='bg-green-600' />
        </Avatar>
      </div>
    </>
  );
};
