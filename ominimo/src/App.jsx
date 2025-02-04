import { RouterProvider } from "react-router-dom";
import { Provider } from "@/components/ui/provider"
import { ChakraProvider } from "@chakra-ui/react";
import { router } from "./lib/routes";


function App() {
  return (
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
