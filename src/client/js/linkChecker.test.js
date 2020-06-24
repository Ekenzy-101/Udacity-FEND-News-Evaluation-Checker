import { checkURL } from "./linkChecker";

// Test for valid URL
test("This is a valid URL", () => {
  expect(checkURL("https://www.instagram.com/")).toBe(true);
});

// Test for an Invalid URL
test("This is a valid URL", () => {
  expect(checkURL("http.///..hh.com")).toBe(false);
});
