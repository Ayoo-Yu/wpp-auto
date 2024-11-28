// app/predict/page.tsx
'use client';

import React, { useState } from 'react';
import { Form, InputNumber, Button, Card, Typography } from '@arco-design/web-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Predict = () => {
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const res = await fetch('/api/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = await res.json();
            if (res.ok) {
                setResult(data.forecast);
                toast.success('预测成功');
            } else {
                toast.error(data.error || '预测失败');
            }
        } catch (error) {
            console.error('预测请求失败:', error);
            toast.error('预测请求失败');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Card>
                <Typography.Title>风电预测</Typography.Title>
                <Form
                    layout="vertical"
                    onSubmit={handleSubmit}
                >
                    <Form.Item label="风速" field="windSpeed" rules={[{ required: true, message: '请输入风速' }]}>
                        <InputNumber min={0} placeholder="请输入风速" />
                    </Form.Item>
                    <Form.Item label="温度" field="temperature" rules={[{ required: true, message: '请输入温度' }]}>
                        <InputNumber placeholder="请输入温度" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            提交预测
                        </Button>
                    </Form.Item>
                </Form>
                {result && (
                    <div style={{ marginTop: '20px' }}>
                        <Typography.Text style={{ fontWeight: 'bold' }}>预测结果：</Typography.Text>
                        <Typography.Text>{result}</Typography.Text>
                    </div>
                )}
            </Card>
            <ToastContainer />
        </div>
    );
};

export default Predict;