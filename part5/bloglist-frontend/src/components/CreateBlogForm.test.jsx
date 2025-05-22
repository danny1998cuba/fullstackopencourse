import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlogForm from "./CreateBlogForm";

describe("Blog create form", () => {
  let mockHandlerCreate;
  const blog = {
    id: "321adf",
    title: "First Blog",
    author: "Author 1",
    url: "http://example.com/1",
    likes: 5,
    user: {
      name: "Daniel",
      username: "danny98",
      id: "321ade",
    },
  };

  beforeEach(() => {
    mockHandlerCreate = vi.fn();
    render(
      <CreateBlogForm
        createBlog={mockHandlerCreate}
        // eslint-disable-next-line no-unused-vars
        throwMessage={(...args) => {}}
      />
    );
  });

  test("create a new blog works", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("create new blog");
    await user.click(button);

    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(3);

    await user.type(inputs[0], blog.title);
    await user.type(inputs[1], blog.author);
    await user.type(inputs[2], blog.url);

    const createButton = screen.getByText("create");
    screen.debug(createButton);
    await user.click(createButton);

    expect(mockHandlerCreate.mock.calls).toHaveLength(1);
    expect(mockHandlerCreate.mock.calls[0][0].title).toBe(blog.title);
    expect(mockHandlerCreate.mock.calls[0][0].author).toBe(blog.author);
    expect(mockHandlerCreate.mock.calls[0][0].url).toBe(blog.url);
  });
});
