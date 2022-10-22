import { withEmotionCache } from "@emotion/react";
import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { ThemeProvider } from "@theme-ui/core";
import type { ReactNode } from "react";
import { useContext, useEffect } from "react";
import { Theme } from '@theme-ui/core';
import { ServerStyleContext, ClientStyleContext } from "./styles/context";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

type DocumentProps = {
  children: ReactNode;
};
const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);
    const resetClientStyleData = clientStyleData?.reset;

    // Only executed on client
    useEffect(() => {
      resetClientStyleData?.();
    }, [resetClientStyleData]);

    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>

        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

const theme: Theme = {
  colors: {
    text: '#111',
    primary: 'red',
    secondary: 'green',
    background: '#eee'
  },
  buttons: {
    primary: {
      color: 'background',
      bg: 'primary',
      '&:hover': {
        bg: 'text',
      }
    },
    secondary: {
      color: 'background',
      bg: 'secondary',
    },
  },
}

export default function App() {
  return (
    <Document>
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </Document>
  );
}