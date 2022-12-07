// Top level App component
import React from "react";
import { ProvidePage } from "./usePage.js";
function App(props) {
  return (
    <ProvidePage>
      {/*
        Route components here, depending on how your app is structured.
        If using Next.js this would be /pages/_app.js
      */}
    </ProvidePage>
  );
}

// Any component that wants auth state
import { usePage } from "./usePage.js";
function Component(props) {
  // Get auth state and re-render anytime it changes
  const page = usePage();
  return (
    <NavbarContainer>
      <Button onClick={() => page.showLoading()}>Show Loading</Button>
    </NavbarContainer>
  );
}