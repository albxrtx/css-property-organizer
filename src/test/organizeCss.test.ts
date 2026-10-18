import * as assert from "node:assert/strict";
import * as postcss from "postcss";
import { organizeCss } from "../postcss";
import test, { suite } from "node:test";

suite("organizeCss", () => {
  /* 
        Test 1
    */

  test("should organize multiple selectors", () => {
    const rootCss = `
        .button {
            width: 100%;
        }

        .title {
            background-color: red;
        }
        `;
    const css = postcss.parse(rootCss);

    organizeCss(css);

    assert.strictEqual(
      css.toString(),
      `.button {
            /* box */
            width: 100%;
}

        .title {
            /* background */
            background-color: red;
}
        `,
    );
  });
  /* 
        Test 2
  */
  test("should organize properties inside media queries", () => {
    const rootCss = `@media (max-width: 600px) {
            root {
                --primary-color: red;
            }

            .card {
                invented-property: 1.5rem;
            }

            h1 {
                font-size: 1.5rem;
            }
        }
        `;
    const css = postcss.parse(rootCss);

    organizeCss(css);

    assert.strictEqual(
      css.toString(),
      `@media (max-width: 600px) {
            root {
                        /* customProperties */
                --primary-color: red;
            }

            .card {
                        /* other */
                invented-property: 1.5rem;
            }

            h1 {
                        /* typography */
                font-size: 1.5rem;
            }
        }
        `,
    );
  });
});
