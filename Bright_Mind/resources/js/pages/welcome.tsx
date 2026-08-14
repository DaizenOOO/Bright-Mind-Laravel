import { Head, usePage } from '@inertiajs/react';

import LandingExperience from '@/landing/App';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Active learning for students and teachers">
                <meta
                    name="description"
                    content="Bright Mind is an Erasmus+ learning framework for students, teachers and partner schools across Europe."
                />
            </Head>
            <LandingExperience isAuthenticated={Boolean(auth.user)} />
        </>
    );
}
