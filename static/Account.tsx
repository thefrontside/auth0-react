import { withAuthenticationRequired } from "@auth0/auth0-react"

const AccountPage = () => {
  debugger;
  return (
    <h1>My Account</h1>
  )
}

// export const Account = withAuthenticationRequired(AccountPage);
export const Account = AccountPage;