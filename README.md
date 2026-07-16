# iboot-website-template

这是iCMS系统前端网站模板骨架，可以快速为用户建立网站，该网站模板骨架使用 Next.js 16 和 HeroUI v3创建, 网站内容依赖于iCMS管理，从而省去了建搭建后台内容管理的时间成本，它适合多语言版本的网站。

iCMS是一款轻量的CMS管理系统，后端系统使用springboot4.0.6构建，目前已支持产品、图文、单内类的内容管理，已基本可以满足一般企业网站所需的功能（当然其它的内容类型及功能也会逐步完成中），做本CMS的目的是在于为网站设计者减轻工作量，去除传统CMS的烦杂功能同时还保证设计网站的自由度，同时作为APP或小程序的后端使用,本模板已封装了做网站时所需的各种API，每个API都有详细注释，方便网站设计师直接调用。

A ready-to-use website template based on Next.js 14 (app directory) and HeroUI v2. Quickly bootstrap your web projects with this pre-configured template.

[![npm version](https://badge.fury.io/js/iboot-website-template.svg)](https://badge.fury.io/js/iboot-website-template)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- Pre-configured Next.js 14 with App Router
- HeroUI v2 components
- Tailwind CSS for styling
- TypeScript support
- Internationalization (i18n) with next-intl
- Dark mode support with next-themes
- Responsive design
- SEO optimized
- Ready-to-use components and pages

## Getting Started

### Prerequisites

- Node.js >= 22.0.0
- npm or yarn

### Installation

You can create a new project using this template in several ways:

#### Using npx (Recommended)

```bash
npx create-next-app@latest my-website -e https://github.com/rockychen2016/icms-website-template
cd my-website
npm install
npm run dev