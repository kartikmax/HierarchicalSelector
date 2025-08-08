# Warehouse Management System

## Overview

This is a modern Angular-based warehouse management system designed to help users navigate and manage warehouse inventory through a hierarchical location structure. The application provides an intuitive stepper interface that guides users through selecting warehouse zones, sections, shelves, and storage units in a logical progression. Built with Angular 20 and Angular Material, it offers a clean, responsive user interface for warehouse operations and inventory management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Angular 20 with standalone components architecture
- **UI Library**: Angular Material Design components for consistent, professional interface
- **Styling**: Material Design theming with custom CSS for warehouse-specific styling
- **Component Structure**: Modular component-based architecture with clear separation of concerns
- **State Management**: Reactive forms with FormBuilder for step validation and local component state management
- **Data Flow**: Observable-based service layer using RxJS for asynchronous operations

### Core Design Patterns
- **Stepper Navigation**: Multi-step wizard pattern using Angular Material Stepper for guided warehouse location selection
- **Hierarchical Data Model**: Four-tier warehouse structure (Zone → Section → Shelf → Storage Unit) with clear parent-child relationships
- **Search and Filter**: Real-time search functionality across all hierarchy levels using Angular Material table filtering
- **Service Layer Pattern**: Centralized data management through WarehouseService with mock data simulation
- **Reactive Programming**: Form controls and data streams managed through RxJS observables for responsive user interactions

### Data Structure
- **Warehouse Hierarchy**: Structured data model supporting zone, section, shelf, and storage unit levels
- **Location Selection**: Stateful tracking of user selections throughout the navigation process
- **Capacity Management**: Storage unit tracking with current occupancy and total capacity metrics
- **Mock Data Service**: Simulated backend responses with realistic warehouse data for development and testing

### User Interface Components
- **Material Stepper**: Linear navigation through warehouse hierarchy levels
- **Data Tables**: Sortable, searchable tables for each hierarchy level with click-to-select functionality
- **Search Interface**: Dedicated search fields for filtering options at each level
- **Selection Summary**: Real-time display of current location path and reset functionality
- **Loading States**: Progress indicators for data loading operations

## External Dependencies

### Frontend Framework & Core
- **Angular 20**: Primary application framework with latest features and performance optimizations
- **TypeScript 5.9**: Strong typing and modern JavaScript features
- **RxJS 7.8**: Reactive programming library for handling asynchronous operations
- **Zone.js**: Angular's change detection and asynchronous task tracking

### UI Component Library
- **Angular Material 20**: Comprehensive Material Design component suite including stepper, tables, forms, and navigation
- **Angular CDK**: Component development kit providing behavioral primitives
- **Material Icons**: Google's icon library for consistent iconography
- **Roboto Font**: Material Design's primary typeface

### Development Tools
- **Angular CLI**: Project scaffolding, build system, and development server
- **TypeScript Compiler**: Code compilation and type checking
- **Angular Build System**: Production-ready bundling and optimization

### Browser Compatibility
- **Modern ES2022 Support**: Optimized for current browser versions with advanced JavaScript features
- **Progressive Web App Ready**: Built with service worker and offline capability support architecture

Note: The application currently uses mock data services but is architected to easily integrate with real backend APIs for production deployment.