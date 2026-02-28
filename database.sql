CREATE DATABASE IF NOT EXISTS restaurant_db;
USE restaurant_db;

CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  mobile VARCHAR(15) NOT NULL,
  address TEXT NOT NULL,
  items JSON NOT NULL,
  beverages JSON,
  dishes JSON,
  special_notes TEXT,
  total_amount DECIMAL(10,2) DEFAULT 0,
  status ENUM('pending','confirmed','preparing','completed','cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admins (username, password) VALUES 
('admin', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

INSERT INTO bookings (customer_name, mobile, address, items, beverages, dishes, status, total_amount) VALUES
('Rahul Sharma', '9876543210', '123 MG Road, Pune', '["Paneer Tikka","Veg Biryani"]', '["Mango Lassi"]', '["Butter Naan"]', 'pending', 650.00),
('Priya Patel', '8765432109', '45 Koregaon Park, Pune', '["Chicken Biryani"]', '["Coca Cola","Lime Soda"]', '["Garlic Bread"]', 'completed', 480.00),
('Amit Desai', '7654321098', '78 Baner Road, Pune', '["Dal Makhani","Shahi Paneer"]', '["Lassi"]', '["Roti","Paratha"]', 'preparing', 720.00);
```

