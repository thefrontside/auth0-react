import React from 'react';
import { withAuthenticationRequired } from "@auth0/auth0-react"

const AccountPage = () => {
  return (
    <h1>My Account</h1>
  )
}

export const Account = withAuthenticationRequired(AccountPage);