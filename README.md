# AraWMS – AraStore Fashion Warehouse Management System

> **Hệ thống Quản lý Kho Thời trang Tập trung cho AraStore**

---

##  Project Overview

AraWMS (AraStore Warehouse Management System) là giải pháp phần mềm quản lý kho và vận hành sản xuất thời trang chuyên biệt, được thiết kế nhằm số hóa và tập trung hóa toàn bộ chuỗi cung ứng từ Kỹ thuật may & Định mức (BOM), Quản lý kho Vải cuộn độc bản & Thành phẩm, Tư vấn & Lên đơn Facebook Messenger LiveChat, đến Đối soát Tài chính COD & Báo cáo Lợi nhuận P&L Real-time.

Dự án giải quyết các điểm nghẽn của quy trình thủ công và sự rời rạc giữa các công cụ đơn lẻ như Pancake, Sapo, KiotViet và Workit, mang lại quy trình khép kín và minh bạch cho các vai trò nhân sự và hệ thống tự động trong doanh nghiệp.

---

## Tech Stack

| Layer            | Technology                         | Description / Usage                  |
| ---------------- | ---------------------------------- | ------------------------------------ |
| Frontend         | React.js                           | Single Page Application (SPA)        |
| State Management | Redux Toolkit / Zustand            | Client-side state management         |
| HTTP Client      | Axios                              | Communication with backend REST APIs |
| UI Framework     | TailwindCSS / Ant Design           | User interface development           |
| Backend          | Node.js & Express.js               | RESTful API architecture             |
| Authentication   | JWT                                | User authentication                  |
| Authorization    | Role-Based Access Control (RBAC)   | Role and permission management       |
| Database         | MongoDB Atlas                      | Cloud NoSQL database                 |
| ODM              | Mongoose                           | MongoDB object modeling              |
| Data Processing  | Aggregation Framework              | Data aggregation and reporting       |
| Social Commerce  | Facebook Graph API & Messenger API | Facebook Messenger integration       |
| Logistics        | GHN / GHTK / Viettel Post API      | Shipping carrier integration         |

---

# Project Scope

## 1. Core Functional Pillars

### 1.1 Fabric Roll & Material Inventory

| No. | Function                | Description                                                                                                         |
| --: | ----------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 1.1 | Unique Roll Barcode     | Assigns a unique barcode to each fabric roll received into the warehouse.                                           |
| 1.2 | Warehouse Location      | Manages storage locations using the hierarchical Zone / Rack / Bin structure.                                       |
| 1.3 | Remnant Roll Management | Recovers, measures and prioritizes the use of unfinished or leftover fabric rolls for subsequent production orders. |
| 1.4 | Low Stock Alert         | Provides alerts when raw material inventory falls below the safety stock threshold.                                 |

### 1.2 Garment Technical Specification, BOM & Production

| No. | Function                        | Description                                                                                                                                                   |
| --: | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2.1 | Garment Technical Specification | Manages garment technical specifications, size charts and Pattern Layout files.                                                                               |
| 2.2 | BOM Versioning                  | Creates and locks BOM versions such as v1.0, v1.1 and v2.0.                                                                                                   |
| 2.3 | MRP & Material Reservation      | Calculates material requirements using MRP and automatically reserves fabric for the sewing workshop.                                                         |
| 2.4 | Wastage Control                 | Controls actual fabric wastage and locks the Production Order when wastage exceeds the permitted threshold of 3%, requiring approval from the Shop Owner. |

### 1.3 Social Commerce & Fulfillment

| No. | Function                    | Description                                                                                              |
| --: | --------------------------- | -------------------------------------------------------------------------------------------------------- |
| 3.1 | Facebook Messenger LiveChat | Provides a centralized Facebook Messenger chat interface.                                                |
| 3.2 | Real-time Inventory Lookup  | Allows Salers to check available inventory in real time by SKU variant (Color / Size).                   |
| 3.3 | Sales Order Creation        | Creates sales orders directly from LiveChat and automatically reserves inventory to prevent overselling. |
| 3.4 | Picking & Packing           | Supports Pick-list based picking, packing, shipping label printing and shipment handover scanning.       |

### 1.4 Returns, Accounting & Business Intelligence

| No. | Function           | Description                                                                                                                                             |
| --: | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4.1 | Returns Management | Receives return/exchange requests, inspects product conditions and automatically applies a *0% surcharge to dirty items or items with missing tags. |
| 4.2 | COD Reconciliation | Imports COD statements, performs automatic reconciliation and flags orders with COD discrepancies.                                                      |
| 4.3 | COGS Calculation   | Automatically calculates Cost of Goods Sold (COGS) based on standard BOM cost and actual material wastage.                                              |
| 4.4 | P&L Dashboard      | Generates real-time Profit & Loss reports and displays financial health indicators through the BI Dashboard.                                            |

---

## 2. Out of Scope / Exclusions – v1.0

| ID    | Excluded Item                                         | Reason / Limitation                                                                                                  |
| ----- | ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| EX-01 | Automatic API integration with Shopee and TikTok Shop | Version 1.0 focuses on completing the Facebook Messenger sales channel.                                              |
| EX-02 | Specialized Tax Accounting Software                   | AraWMS focuses on internal operational accounting and COGS rather than directly performing VAT/CIT tax declarations. |

---

# User Roles & System Actors

| No. | Actor / Role          | Responsibilities                                                                                                                                                                  |
| --: | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   1 | **Shop Owner**        | Views BI Dashboard and P&L reports, manages inventory valuation, and approves high-risk exceptions such as fabric wastage above 3% and high-value inventory adjustments.          |
|   2 | **General Manager**   | Configures system parameters, approves BOMs, creates and releases Production Orders, and manages suppliers and shipping partners.                                                 |
|   3 | **BOM Manager**       | Manages Pattern Layout records, designs and locks BOM versions, and controls fabric wastage.                                                                                      |
|   4 | **Warehouse Manager** | Configures warehouse Zone/Rack/Bin structures, approves warehouse receipt/issue notes, initiates stocktakes, and manages defective inventory.                                     |
|   5 | **Warehouse Staff**   | Prints and applies barcodes, stores inventory, performs picking based on Pick-lists, packs orders, scans shipment handovers, and inspects returned products.                      |
|   6 | **Accountant**        | Reconciles COD payments, handles COD discrepancies, manages supplier payables, approves financial aspects of returns, and calculates COGS.                                        |
|   7 | **Saler**             | Provides customer support through Facebook Messenger LiveChat, checks real-time inventory, creates sales orders with inventory reservation, and creates return/exchange requests. |
|   8 | **Automated System**  | Synchronizes messages, generates fabric-roll barcodes, executes MRP calculations, automatically reserves/releases inventory, and generates red-flag alerts.                       |

---

# System Architecture

┌─────────────────────────────────────────────┐
│                  Frontend                   │
│                 React.js                   │
│                                             │
│                      │
└──────────────────────┬──────────────────────┘
                       │
                       │ RESTful API
                       ▼
┌─────────────────────────────────────────────┐
│                  Backend                    │
│             Node.js / Express.js            │
│                                             │
│                      │
└──────────────────────┬──────────────────────┘
                       │
                       │ Mongoose ODM
                       ▼
┌─────────────────────────────────────────────┐
│                 Database                    │
│               MongoDB Atlas                 │
│                                             │
│                      │
└─────────────────────────────────────────────┘

                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
   Facebook API    Carrier APIs   Other Services
   Messenger API   GHN             External APIs
                   
```

---

#  Main Business Modules

| Module                          | Main Responsibilities                                                   |
| ------------------------------- | ----------------------------------------------------------------------- |
| User & Authorization            | User accounts, roles, permissions and audit logs                        |
| Product & SKU                   | Product catalog, variants, colors, sizes and barcodes                   |
| Raw Material                    | Fabric, accessories, suppliers and safety stock                         |
| Warehouse                       | Fabric rolls, locations, stock receipts, issues and transfers           |
| Garment Technical Specification | Technical specifications, size charts and Pattern Layout                |
| BOM Management                  | BOM creation, versioning, approval and locking                          |
| Production                      | Production Orders, material reservation, material issue and consumption |
| Inventory Control               | Stocktake, inventory adjustment and discrepancy handling                |
| Social Commerce                 | Facebook Messenger conversations and customer management                |
| Sales Order                     | Sales orders, SKU reservation and fulfillment                           |
| Shipping                        | Picking, packing, waybill and carrier handover                          |
| Returns                         | Return/exchange requests and product inspection                         |
| Finance                         | COD reconciliation, financial transactions and COGS                     |
| Business Intelligence           | Dashboard, inventory analytics and P&L reports                          |

---

#  Authorization Roles

| Role                  | Main Access                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------ |
| **Shop Owner**        | BI Dashboard, P&L, inventory valuation, high-risk approvals                                |
| **General Manager**   | System configuration, BOM approval, Production Orders, suppliers and carriers              |
| **BOM Manager**       | Technical specifications, Pattern Layout, BOM and wastage control                          |
| **Warehouse Manager** | Warehouse configuration, stock notes, stocktake and defective inventory                    |
| **Warehouse Staff**   | Barcode scanning, put-away, picking, packing, handover and return inspection               |
| **Accountant**        | COD reconciliation, supplier payables, return financial approval and COGS                  |
| **Saler**             | Facebook LiveChat, inventory lookup, sales orders and return requests                      |
| **Automated System**  | Message synchronization, barcode generation, MRP, inventory reservation/release and alerts |

---

#  Third-Party Integrations

| Integration                | Purpose                             |
| -------------------------- | ----------------------------------- |
| **Facebook Graph API**     | Facebook platform integration       |
| **Facebook Messenger API** | Customer conversations and LiveChat |
| **GHN API**                | Shipping and delivery integration   |
---

#  Version 1.0 Limitations

* Shopee API integration is **not included** in Version 1.0.
* TikTok Shop API integration is **not included** in Version 1.0.
* Version 1.0 focuses on the **Facebook Messenger sales channel**.
* AraWMS does **not replace specialized tax accounting software**.
* AraWMS focuses on **internal operational accounting, COD reconciliation and COGS**, rather than direct VAT/CIT tax declaration.

---

#  Project Status

> **AraWMS is a specialized warehouse and production management system for AraStore, integrating inventory, production, Facebook commerce, fulfillment, returns, COD reconciliation and business intelligence into a centralized platform.**
