import React from 'react';
import UserLayout from '../../../hoc/user';
import ManageBrands from './manage_brands';
import ManageColors from './manage_colors';

const ManageCategories = () => {
    return (
        <UserLayout>
            <ManageBrands/>
            <ManageColors/>
        </UserLayout>
    );
};

export default ManageCategories;