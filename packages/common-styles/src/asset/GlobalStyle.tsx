import { css, Global } from '@emotion/react';
import { colors } from '@common/styles';
import { NotoSansCJKkrRegular, NotoSansCJKkrBold } from './fonts/NotoSansCJKkr';

export default function GlobalStyle(): JSX.Element {
  return (
    <Global
      styles={css`
        /* reset */
        body,
        div,
        span,
        dl,
        dt,
        dd,
        ul,
        ol,
        li,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        table,
        th,
        td,
        form,
        fieldset,
        legend,
        label,
        textarea,
        input,
        radio,
        select,
        button,
        article,
        aside,
        dialog,
        footer,
        header,
        section,
        footer,
        nav,
        figure,
        main {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'NotoSansCJKkrRegular';
          word-break: break-word;
          font-weight: normal;
        }

        * {
          -moz-osx-font-smoothing: grayscale;
        }

        article,
        aside,
        dialog,
        footer,
        header,
        section,
        footer,
        nav,
        figure,
        main {
          display: block;
        }

        html,
        body {
          height: 100%;
          -webkit-text-size-adjust: none;
          -ms-text-size-adjust: none;
          scroll-behavior: smooth;
          background-color: ${colors.bg_gray};
          scrollbar-width: thin;
        }

        #root {
          /* height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: flex-start; */
          font-family: 'NotoSansCJKkrRegular';
          word-break: break-word;
          font-weight: normal;
        }

        img,
        form,
        fieldset,
        svg,
        li {
          border: 0;
          vertical-align: top;
          -webkit-user-drag: none;
        }

        ul,
        ol,
        li {
          list-style: none;
        }

        button {
          overflow: visible;
          border: 0;
          background-color: transparent;
          cursor: pointer;
        }

        button:disabled {
          cursor: default;
        }

        button::-moz-focus-inner {
          padding: 0;
          margin: -1px;
        }

        address,
        caption,
        em {
          font-style: normal;
        }

        a,
        a:focus,
        a:active,
        a:hover {
          text-decoration: none;
        }

        table {
          border-collapse: collapse;
          border-spacing: 0;
        }

        label {
          cursor: pointer;
        }

        ul::-webkit-scrollbar {
          width: 4px;
        }

        ul::-webkit-scrollbar-thumb {
          height: 20%;
          background: ${colors.ays_maincolor};
          border-radius: 8px;
        }
        ul::-webkit-scrollbar-track {
          background: rgba(33, 122, 244, 0.1);
        }

        @font-face {
          font-family: 'NotoSansCJKkrRegular';
          src: url(${NotoSansCJKkrRegular}) format('woff');
        }
        @font-face {
          font-family: 'NotoSansCJKkrBold';
          src: url('${NotoSansCJKkrBold}') format('woff');
        }
      `}
    />
  );
}
