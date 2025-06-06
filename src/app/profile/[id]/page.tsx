export default function UserProfile({ params }: any) {
     return(
          <div className="flex flex-col items-center justify-center min-h-screen py-2">
               <h1>Profile</h1>
               <hr />
               <p className="text-4xl">Profile page 
               <span className="pt-1 pb-1 p-2 ml-3 rounded bg-orange-500 text-black">
                    {params.id}</span></p>
          </div>
     )
}    