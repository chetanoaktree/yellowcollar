import { signIn, signOut, useSession } from "next-auth/react"

export default function Component() {
  const { data: token, status } = useSession() 
 
  if (status === "authenticated") {
    console.log("token", token)
    return (
      <div>
        <p>Signed in as {token.user.name}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    )
  }

  return (
    <div>
      {/*<a href="/api/auth/signin">Sign in</a>*/}
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )

}