'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                {
                    method: 'POST',

                    credentials: 'include',

                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({
                        username,
                        password,
                    }),
                },
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);

                return;
            }

            router.replace('/dashboard');
        } catch (error) {
            console.error(error);

            alert('Server error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen bg-slate-100">
            {/* LEFT SIDE */}
            <section className="hidden flex-1 items-center justify-center bg-black p-12 text-white lg:flex">
                <div className="flex flex-col items-center justify-center">
                    <img
                        src="/logo.svg"
                        alt="Raja Offset"
                        className="h-40 w-100"
                    />
                </div>
            </section>

            {/* RIGHT SIDE */}
            <section className="flex flex-1 items-center justify-center p-6">
                <Card className="w-full max-w-md border-0 shadow-2xl">
                    <CardContent className="space-y-6 p-8">
                        <div className="space-y-2 text-center">
                            <h2 className="text-3xl font-bold">
                                Welcome Back
                            </h2>

                            <p className="text-sm text-slate-500">
                                Login to continue
                            </p>
                        </div>

                        <div className="space-y-4">
                            <Input
                                placeholder="Username"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }
                            />

                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />

                            <Button
                                className="w-full"
                                onClick={handleLogin}
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </section>
        </main>
    );
}