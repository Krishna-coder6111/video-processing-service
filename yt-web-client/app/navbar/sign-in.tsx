import { User } from "firebase/auth";
import styles from './signIn.module.css';
import { signInWithGoogle, signOut } from "../firebase/firebase";

interface SignInProps {
    user: User | null;
}

export default function SignIn({user}: SignInProps){ // Remove the extra colon after 'user'
    return (
        <div>
            {user ? (
                <button className={styles.signin} onClick={signOut}>Sign Out</button>
            ) : (
                <button className={styles.signin} onClick={signInWithGoogle}>Sign In</button>
            )}
        </div>
    );
}