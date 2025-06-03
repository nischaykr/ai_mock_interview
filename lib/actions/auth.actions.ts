"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";


const SESSION_DURATION = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
    const {uid, name, email} = params;
    try {
        const userRecord = await db.collection('users').doc(uid).get();
        if(userRecord.exists) {
            return {
                success: false,
                message: 'User already exists. Please sign in instead.'
            }
        }
        await db.collection('users').doc(uid).set({
            name,
            email,
        })

        return{
            success: true,
            message: 'User created successfully.'
        }
    } catch (error: any) {
        console.error('Error creating user:', error);
        if(error.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: 'Email already in use. Please use a different email.'
            }
        }
        return {
            success: false,
            message: 'An error occurred while signing up. Please try again.'
    }
}
}

export async function signIn(params: SignInParams) {
    const {email, idToken} = params;
    try {
        const userRecord = await auth.getUserByEmail(email);
        if(!userRecord) {
            return {
                success: false,
                message: 'User not found. Please sign up instead.'
            }
        }
        await setSessionCookie(idToken);
    } catch (error) {
        console.error('Error signing in user:', error);
    }
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();
  
    // Create session cookie
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: SESSION_DURATION * 1000, // milliseconds
    });
  
    // Set cookie in the browser
    cookieStore.set("session", sessionCookie, {
      maxAge: SESSION_DURATION,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });
  }

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    if(!sessionCookie) {
        return null;
    }
    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();

        if(!userRecord.exists) {
            return null;
        }

        return {
            ...userRecord.data(),
            id: userRecord.id,
        } as User;
    } catch (error) {
        console.error('Error verifying session cookie:', error);
        return null;
    }
}

export async function isAuthenticated(){
    const user = await getCurrentUser();
    return !!user;
}

export async function getInterviewsByUserId(userId: string): Promise<Interview[] | null>{
    const interviews = await db.collection('userId').orderBy('createdAt','desc').get();
    return interviews.docs.map((doc)=>({
        id: doc.id,
        ...doc.data()
    })) as Interview[];
}