'use client';

import { signIn, signOut } from "next-auth/react"

export default () => {

    const run = async () => {
        await signIn('credentials', { username: 'admin', password: 'admin' });
    }

    return <div>
        <button onClick={run}>Test</button>

        <button onClick={() => signOut()}>sign out</button>
    </div>
}
