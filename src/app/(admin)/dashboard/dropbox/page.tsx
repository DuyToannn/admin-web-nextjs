'use client'

import { Button, message } from 'antd'
import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { Statistic } from "antd";

const DropboxPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [spaceUsage, setSpaceUsage] = useState<number | null>(null);
    const [totalSpace, setTotalSpace] = useState<number | null>(null);
    const [accountInfo, setAccountInfo] = useState<string | null>(null);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/dropbox-manage/status`);
            if (response.data.data && response.data.data.isLoggedIn) {
                setIsLoggedIn(true);
                fetchSpaceUsage();
                fetchAccountInfo();
            } else {
                setIsLoggedIn(false)
            }
        } catch (error) {
            console.error('Error checking login status:', error);
            setIsLoggedIn(false);
        }
    };

    const handleDropboxLogin = async () => {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/dropbox-manage/auth`;
        // Show success message after successful login
    };

    const handleDropboxLogout = async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/dropbox-manage/logout`);
            setIsLoggedIn(false);
            setSpaceUsage(null);
            setTotalSpace(null);
            setAccountInfo(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const fetchSpaceUsage = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/dropbox-manage/space-usage`);
            console.log('Space usage response:', response.data);

            if (response.data && response.data.data) {
                const { spaceUsage, totalSpace } = response.data.data;
                if (!isNaN(parseFloat(spaceUsage)) && !isNaN(parseFloat(totalSpace))) {
                    setSpaceUsage(parseFloat(spaceUsage) / 1024);
                    setTotalSpace(parseFloat(totalSpace) / 1024);
                } else {
                    console.error('Invalid space usage or total space value:', spaceUsage, totalSpace);
                    setSpaceUsage(0);
                    setTotalSpace(0);
                }
            } else {
                console.error('Space usage data not found in response');
                setSpaceUsage(0);
                setTotalSpace(0);
            }
        } catch (error) {
            console.error('Error fetching space usage:', error);
            setSpaceUsage(0);
            setTotalSpace(0);
        }
    };

    const fetchAccountInfo = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/dropbox-manage/account-info`);
            if (response.data && response.data.data && response.data.data.email) {
                setAccountInfo(response.data.data.email);
            } else {
                console.error('Account info not found in response');
                setAccountInfo(null);
            }
        } catch (error) {
            console.error('Error fetching account info:', error);
            setAccountInfo(null);
        }
    };

    return (
        <div>
            {!isLoggedIn ? (
                <Button
                    onClick={handleDropboxLogin}
                    style={{
                        backgroundColor: '#6A9C89',
                        color: '#FFFFFF',
                        border: '1px solid #4A7C6D',
                        borderRadius: '5px',
                        padding: '10px 20px',
                        transition: 'background-color 0.3s, transform 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5B8B7A'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6A9C89'}
                    onFocus={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onBlur={(e) => e.currentTarget.style.transform = 'scale(1)'}>Đăng nhập với Dropbox</Button>
            ) : (
                <div>
                    <Button
                        onClick={handleDropboxLogout}
                        style={{
                            backgroundColor: '#6A9C89',
                            color: '#FFFFFF',
                            border: '1px solid #4A7C6D',
                            borderRadius: '5px',
                            padding: '10px 20px',
                            transition: 'background-color 0.3s, transform 0.3s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5B8B7A'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6A9C89'}
                        onFocus={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onBlur={(e) => e.currentTarget.style.transform = 'scale(1)'}>Đăng xuất</Button>
                    {accountInfo && (
                        <p style={{ marginTop: '10px' }}>Email: {accountInfo}</p>
                    )}
                    {spaceUsage !== null && totalSpace !== null && (
                        <div style={{ display: 'flex', alignItems: 'left', marginTop: '20px', gap: '20px' }}>
                            <Statistic title="Dung lượng sử dụng" value={spaceUsage} precision={2} suffix="GB" />
                            <Statistic title="Tổng dung lượng" value={totalSpace} precision={2} suffix="GB" />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DropboxPage;