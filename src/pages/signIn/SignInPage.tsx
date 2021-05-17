import React from 'react';
import { UserLayout } from '../../layouts';
import { SignInForm } from './SiginInForm';

export const SignInPage: React.FC = (props) => {
    return (
        <UserLayout>
            <SignInForm />
        </UserLayout>
    )
}