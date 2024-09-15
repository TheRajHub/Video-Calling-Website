# 📹 Video Calling Website

This project is a **simple video calling application** built with **Socket.IO** for signaling and **WebRTC** for peer-to-peer connections. The app allows **two clients** to communicate via video and audio, following a **mesh topology**.

## 🚀 Features

- 🔄 **Real-time** video and audio communication between **two clients**.
- ⚙️ Uses **Socket.IO** for signaling to initiate the WebRTC connection.
- 🔗 **WebRTC** handles the peer-to-peer media streaming directly between clients.
- 🧩 Implements a **mesh topology**, ensuring each client connects directly to the other.
- 🎨 Simple and user-friendly interface for effortless video calls.

## 🔒 Limitations

- Only **two clients** can participate in a call at any given time.
- **No support for more than two clients** in a single session due to the mesh topology design.

## 🛠️ Tech Stack

- **Socket.IO**: For signaling (offer/answer, ICE candidates exchange).
- **WebRTC**: Peer-to-peer media streaming and connection management.
- **Node.js**: Backend server for signaling and basic routing.

## 📝 How to Run

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/videocall-website.git
    cd videocall-website
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the server**:
    ```bash
    npm start
    ```

4. **Open your browser** and navigate to:
    ```
    http://localhost:3000
    ```
   Start a video call by opening the URL in two separate tabs or browsers.

## 🛠️ Future Enhancements

- 📈 Support for **multiple clients** using advanced topologies like SFU (Selective Forwarding Unit) or MCU (Multipoint Control Unit).
- 🖌️ Improved user interface for a smoother experience.

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---

Happy coding! 🎉
