# Car Selection App

This is a Next.js application that allows users to select a car model and year, and then displays the cars that match the selected parameters.

## Features

- **Model & Year Selection:**  
  Users can choose a car make and year from dropdown lists. An input search field is also provided to filter the makes list based on the user's input.

- **Car Results Display:**  
  Once a car make and year are selected, the app displays the matching cars in a list with details such as model name and specifications.

## Architecture

The application is built using Next.js, a React framework that supports both server-side rendering (SSR) and static site generation (SSG). The application is structured as follows:

1. **Home Page:**  
   The main page where users select a car make and year. It includes:
   - Dropdown for selecting car make.
   - Searchable input field for filtering makes.
   - Dropdown for selecting the car year.

2. **Result Page:**  
   After making a selection, users are directed to a results page that lists cars matching the selected make and year.

## Getting Started

To get started with the development environment, follow the steps below:

### Prerequisites

- **Node.js** (version 14 or above)
- **Yarn** (or npm, if preferred)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/diana-tuz/car-dealer.git
