import React from 'react';
import { UserLayout } from '../../layouts';
import { RegisterForm } from './RegisterForm';
export const RegisterPage: React.FC = (props) => {
    console.log(props);

    return (
        <UserLayout>
            <RegisterForm />
        </UserLayout>
    )
}