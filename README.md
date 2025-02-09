Here’s the updated README with the adjusted contributing, license, and contact information:

---

# **Dynamic UI Modifier**  
### A Chrome Extension to Personalize Your Browsing Experience 🎨🔧

---

**Dynamic UI Modifier** is a powerful Chrome extension that **automatically adjusts your browsing experience** based on your usage habits. No more cluttered interfaces or wasted space—this tool ensures you see what matters most and hide the rest. 

Whether you want to prioritize a specific section of a webpage, hide elements you never use, or just make your experience more streamlined, this extension has you covered!

---

## ✨ **Key Features**

- **Smart Adaptation**: Learns your behavior over time and modifies the UI accordingly.
- **Personalized Actions**: Customize actions like scaling, hiding, or changing the appearance of elements.
- **No Configuration Needed**: It learns automatically based on your interactions, with minimal setup.
- **Instant Preview**: See exactly how changes will look before applying them.
- **Persistent Customization**: Save your settings in a `settings.json` file, and export them for use across devices.

---

## 🚀 **Installation**

1. **Download** the extension files.
2. Open **Chrome**, and navigate to `chrome://extensions/`.
3. Toggle **Developer Mode** on (top-right corner).
4. Click **Load unpacked** and select the folder containing the extension.
5. The extension is now installed and will start adapting to your behavior immediately!

---

## 🛠 **How to Use**

### 1. **Select an Element to Modify:**

- Click on any element on the page you want to modify (e.g., a sidebar, search bar, or comment section).
- The selected element will **be highlighted with a red border** to indicate it’s ready for modification.

### 2. **Choose an Action for the Element:**

Once an element is selected, a prompt will appear asking you to select an action. You can choose from these options:
- **Scale**: Increase the element's size.
- **Hide**: Completely hide the element from view.
- **Fullscreen**: Make the element take up the whole screen.
- **Color**: Change the element’s color (e.g., red).
- **Opacity**: Adjust the transparency of the element.

### 3. **Preview the Action:**

Before confirming, you'll see a **real-time preview** of how the action will look on the element. This ensures you're happy with the change before applying it permanently.

### 4. **Save Your Settings:**

- Once you're happy with the change, confirm your selection.
- Your settings are automatically saved in a `settings.json` file for future use.
- **Export** your settings anytime you want to move them to another browser or device.

---

## 🌐 **Example Use Cases**

- **YouTube**: Prioritize your subscriptions and hide the comment section if you never engage with it.
- **Social Media**: Always keep the search bar visible and reduce the size of sidebars or other elements you rarely interact with.
- **E-Commerce**: Hide promotional popups or emphasize buttons you click on often.

---

## 📂 **File Overview**

The extension is built with several core files:

- **`settings.json`**: Stores your personalized configurations, including the selectors for elements and their respective actions.
  
  Example:
  ```json
  {
    "example.com": {
      "selectors": {
        "sidebar": "#sidebar",
        "comments": ".comments",
        "search": "#search",
        "like": "#like"
      },
      "actions": {
        "sidebar": {
          "action": "scale",
          "threshold": 5
        },
        "comments": {
          "action": "hide",
          "threshold": 0
        },
        "search": {
          "action": "scale",
          "threshold": 3
        },
        "like": {
          "action": "opacity",
          "threshold": 2
        }
      }
    }
  }
  ```

- **`content.js`**: Contains the logic for interacting with elements and applying user-selected actions.

- **`example.html`**: A basic page for testing and experimenting with the extension’s features.

- **`manifest.json`**: Describes the extension’s metadata and permissions.

---

## 🧩 **Advanced Customization**

- **Dynamic Element Detection**: The extension intelligently tracks which elements you interact with most on each page and applies actions based on usage.
- **Thresholds for Actions**: Customize the visibility threshold for each action (e.g., how long an element must remain visible to trigger an action).
- **Export & Import**: You can **export your customizations** and transfer them to another browser or share with others.

---

## 💡 **User Experience Example**

Imagine you’re watching YouTube:
- The extension learns that you **only watch subscription-based videos**, so it automatically places the **subscriptions section at the top**.
- It notices that you **never read the comments**, so it hides them entirely.
- You interact with the **search bar a lot**, so it keeps it visible at all times, even if you scroll down the page.

It’s that simple!

---

## 🔧 **Contributing**

We welcome contributions to enhance the functionality and features of this extension! However, **commercial use is strictly prohibited**.

Feel free to fork the repository or submit a pull request for bug fixes, UI improvements, or feature additions. We are especially interested in:

- Improving the overall usability of the extension.
- Enhancing compatibility with more websites.
- Adding new customization options.

---

## 📄 **License**

This project is licensed under the **MIT License**, with **commercial use prohibited**. Please refer to the [LICENSE](LICENSE) file for more details.

---

## 📬 **Contact Us**

For any inquiries or support, reach us via email at [contact@doganddev.eu](mailto:contact@doganddev.eu).

---

### **Enjoy a personalized web browsing experience like never before with Dynamic UI Modifier!** 🌟🚀

---

This version ensures that the **commercial use restriction** is clear, provides better structure, and keeps the contact email and contributing guidelines in a concise and straightforward manner.
