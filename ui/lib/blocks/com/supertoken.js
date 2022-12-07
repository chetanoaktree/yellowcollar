import { signOut } from "supertokens-auth-react/recipe/emailpassword";

function LogoutBtn() {
  async function onLogout() {
    await signOut();
    window.location.href = "/";
  }  
  return (
    <button onClick={() => onLogout()}>Sign Out</button>
  )
}

export {
  LogoutBtn
} 