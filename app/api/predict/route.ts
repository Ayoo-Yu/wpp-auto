// app/api/predict/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // 确保路径正确

export async function POST(request: Request) {
  try {
    const { windSpeed, temperature } = await request.json();

    // 调用你的预测模型（请替换为实际代码）
    const forecast = predictWind(Number(windSpeed), Number(temperature));

    // 保存预测数据到数据库
    const prediction = await prisma.prediction.create({
      data: {
        windSpeed,
        temperature,
        forecast,
      },
    });

    return NextResponse.json({ forecast: prediction.forecast });
  } catch (error) {
    console.error('预测请求失败:', error);
    return NextResponse.json({ error: '预测请求失败' }, { status: 500 });
  }
}

// 示例预测函数（请替换为你的实际模型代码）
function predictWind(windSpeed: number, temperature: number): string {
  // 简单的示例逻辑
  const predictedOutput = windSpeed * 1.5 + temperature * 0.5;
  return `预测的风电输出为 ${predictedOutput} kW`;
}
