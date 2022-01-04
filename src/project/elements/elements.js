export const App = {
  type: "HashRouter",
  children: [
    {
      type: "Route",
      props: { path: "*" },
      children: {
        $val: [
          {
            $pipe: [
              { $get: ["match.url"] },
              {
                $unless: [
                  { $equals: [{ $getData: ["url"] }] },
                  { $pipe: [{ $setData: ["url"] }] },
                ],
              },
              { $getToken: ["jwt"] },
              {
                $unless: [
                  { $equals: [{ $val: [{ $getData: ["user.token"] }] }] },
                  {
                    $pipe: [
                      {
                        $axios: [
                          {
                            method: "get",
                            url: "https://conduit.productionready.io/api/user",
                          },
                        ],
                      },
                      {
                        $andThen: [
                          {
                            $pipe: [
                              { $get: ["data.user"] },
                              {
                                $pass: [
                                  { $get: ["token"] },
                                  { $setToken: ["jwt"] },
                                ],
                              },
                              { $pass: [{ $setData: ["user"] }] },
                              { $pass: [{ $setData: ["draft.user"] }] },
                            ],
                          },
                        ],
                      },
                      {
                        $otherwise: [
                          {
                            $pipe: [
                              { $get: ["response.data.errors"] },
                              { $setData: ["errors"] },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          { $always: [null] },
        ],
      },
    },
    {
      type: "div",
      children: [
        { type: "Header" },
        {
          type: "Switch",
          children: [
            {
              type: "Route",
              props: {
                exact: true,
                path: "/",
                render: {
                  $pipe: [
                    { $getData: ["selectedList"] },
                    {
                      $unless: [
                        { $equals: ["globalList"] },
                        {
                          $pipe: [
                            { $getData: ["selectedPageIndex"] },
                            { $multiply: [10] },
                            { $of: [] },
                            {
                              $prepend: [
                                "https://conduit.productionready.io/api/articles?limit=10&offset=",
                              ],
                            },
                            { $join: [""] },
                            { $objOf: ["url"] },
                            { $mergeRight: [{ method: "get" }] },
                            { $axios: [] },
                            {
                              $andThen: [
                                {
                                  $pipe: [
                                    {
                                      $pass: [
                                        {
                                          $setData: [
                                            "selectedList",
                                            "globalList",
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      $pass: [
                                        { $get: ["data.articles"] },
                                        { $setData: ["globalList"] },
                                      ],
                                    },
                                    { $get: ["data.articlesCount"] },
                                    { $setData: ["articlesCount"] },
                                  ],
                                },
                              ],
                            },
                            {
                              $otherwise: [
                                {
                                  $pipe: [
                                    { $get: ["response.data.errors"] },
                                    { $setData: ["errors"] },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    { $getData: ["tags"] },
                    {
                      $when: [
                        { $isEmpty: [] },
                        {
                          $pipe: [
                            {
                              $axios: [
                                {
                                  method: "get",
                                  url: "https://conduit.productionready.io/api/tags",
                                },
                              ],
                            },
                            {
                              $andThen: [
                                {
                                  $pipe: [
                                    { $get: ["data.tags"] },
                                    { $setData: ["tags"] },
                                  ],
                                },
                              ],
                            },
                            {
                              $otherwise: [
                                {
                                  $pipe: [
                                    { $get: ["response.data.errors"] },
                                    { $setData: ["errors"] },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    { $render: [{ type: "Home" }] },
                  ],
                },
              },
            },
            {
              type: "Route",
              props: {
                exact: true,
                path: "/feed",
                render: {
                  $pipe: [
                    { $getData: ["selectedList"] },
                    {
                      $unless: [
                        { $equals: ["feedList"] },
                        {
                          $pipe: [
                            { $getData: ["selectedPageIndex"] },
                            { $multiply: [10] },
                            { $of: [] },
                            {
                              $prepend: [
                                "https://conduit.productionready.io/api/articles/feed?limit=10&offset=",
                              ],
                            },
                            { $join: [""] },
                            { $objOf: ["url"] },
                            { $mergeRight: [{ method: "get" }] },
                            { $axios: [] },
                            {
                              $andThen: [
                                {
                                  $pipe: [
                                    {
                                      $pass: [
                                        {
                                          $setData: [
                                            "selectedList",
                                            "feedList",
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      $pass: [
                                        { $get: ["data.articles"] },
                                        { $setData: ["feedList"] },
                                      ],
                                    },
                                    { $get: ["data.articlesCount"] },
                                    { $setData: ["articlesCount"] },
                                  ],
                                },
                              ],
                            },
                            {
                              $otherwise: [
                                {
                                  $pipe: [
                                    { $get: ["response.data.errors"] },
                                    { $setData: ["errors"] },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    { $getData: ["tags"] },
                    {
                      $when: [
                        { $isEmpty: [] },
                        {
                          $pipe: [
                            {
                              $axios: [
                                {
                                  method: "get",
                                  url: "https://conduit.productionready.io/api/tags",
                                },
                              ],
                            },
                            {
                              $andThen: [
                                {
                                  $pipe: [
                                    { $get: ["data.tags"] },
                                    { $setData: ["tags"] },
                                  ],
                                },
                              ],
                            },
                            {
                              $otherwise: [
                                {
                                  $pipe: [
                                    { $get: ["response.data.errors"] },
                                    { $setData: ["errors"] },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    { $render: [{ type: "Home" }] },
                  ],
                },
              },
            },
            {
              type: "Route",
              props: {
                exact: true,
                path: "/filter/:tag",
                render: {
                  $pipe: [
                    { $get: ["match.params.tag"] },
                    {
                      $unless: [
                        {
                          $pipe: [
                            {
                              $equals: [
                                { $val: [{ $getData: ["selectedTag"] }] },
                              ],
                            },
                          ],
                        },
                        {
                          $pipe: [
                            { $of: [] },
                            {
                              $prepend: [
                                "https://conduit.productionready.io/api/articles?tag=",
                              ],
                            },
                            {
                              $append: [
                                {
                                  $val: [
                                    { $getData: ["selectedPageIndex"] },
                                    { $multiply: [10] },
                                    { $of: [] },
                                    { $prepend: ["&offset="] },
                                    { $join: [""] },
                                  ],
                                },
                              ],
                            },
                            { $join: [""] },
                            { $objOf: ["url"] },
                            { $mergeRight: [{ method: "get" }] },
                            { $axios: [] },
                            {
                              $andThen: [
                                {
                                  $pipe: [
                                    {
                                      $pass: [
                                        { $get: ["config.url"] },
                                        {
                                          $replace: [
                                            /^.*conduit\.productionready\.io\/api\/articles\?tag=(.*?)&offset=.*$/,
                                            "$1",
                                          ],
                                        },
                                        { $setData: ["selectedTag"] },
                                      ],
                                    },
                                    {
                                      $pass: [
                                        {
                                          $setData: [
                                            "selectedList",
                                            "filteredList",
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      $pass: [
                                        { $get: ["data.articles"] },
                                        { $setData: ["filteredList"] },
                                      ],
                                    },
                                    { $get: ["data.articlesCount"] },
                                    { $setData: ["articlesCount"] },
                                  ],
                                },
                              ],
                            },
                            {
                              $otherwise: [
                                {
                                  $pipe: [
                                    { $get: ["response.data.errors"] },
                                    { $setData: ["errors"] },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    { $getData: ["tags"] },
                    {
                      $when: [
                        { $isEmpty: [] },
                        {
                          $pipe: [
                            {
                              $axios: [
                                {
                                  method: "get",
                                  url: "https://conduit.productionready.io/api/tags",
                                },
                              ],
                            },
                            {
                              $andThen: [
                                {
                                  $pipe: [
                                    { $get: ["data.tags"] },
                                    { $setData: ["tags"] },
                                  ],
                                },
                              ],
                            },
                            {
                              $otherwise: [
                                {
                                  $pipe: [
                                    { $get: ["response.data.errors"] },
                                    { $setData: ["errors"] },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    { $render: [{ type: "Home" }] },
                  ],
                },
              },
            },
            {
              type: "Route",
              props: {
                exact: true,
                path: "/profile/:username",
                render: {
                  $pipe: [
                    { $get: ["match.params.username"] },
                    {
                      $pass: [
                        {
                          $unless: [
                            {
                              $equals: [
                                { $val: [{ $getData: ["profile.username"] }] },
                              ],
                            },
                            {
                              $pipe: [
                                { $of: [] },
                                {
                                  $prepend: [
                                    "https://conduit.productionready.io/api/profiles/",
                                  ],
                                },
                                { $join: [""] },
                                { $objOf: ["url"] },
                                { $mergeRight: [{ method: "get" }] },
                                { $axios: [] },
                                {
                                  $andThen: [
                                    {
                                      $pipe: [
                                        { $get: ["data.profile"] },
                                        { $setData: ["profile"] },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  $otherwise: [
                                    {
                                      $pipe: [
                                        { $get: ["response.data.errors"] },
                                        { $setData: ["errors"] },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      $unless: [
                        {
                          $pipe: [
                            { $getData: ["selectedList"] },
                            { $equals: ["authoredList"] },
                          ],
                        },
                        {
                          $pipe: [
                            { $of: [] },
                            {
                              $prepend: [
                                "https://conduit.productionready.io/api/articles?author=",
                              ],
                            },
                            {
                              $append: [
                                {
                                  $val: [
                                    { $getData: ["selectedPageIndex"] },
                                    { $multiply: [10] },
                                    { $of: [] },
                                    { $prepend: ["&offset="] },
                                    { $join: [""] },
                                  ],
                                },
                              ],
                            },
                            { $join: [""] },
                            { $objOf: ["url"] },
                            { $mergeRight: [{ method: "get" }] },
                            { $axios: [] },
                            {
                              $andThen: [
                                {
                                  $pipe: [
                                    {
                                      $pass: [
                                        {
                                          $setData: [
                                            "selectedList",
                                            "authoredList",
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      $pass: [
                                        { $get: ["data.articles"] },
                                        { $setData: ["authoredList"] },
                                      ],
                                    },
                                    { $get: ["data.articlesCount"] },
                                    { $setData: ["articlesCount"] },
                                  ],
                                },
                              ],
                            },
                            {
                              $otherwise: [
                                {
                                  $pipe: [
                                    { $get: ["response.data.errors"] },
                                    { $setData: ["errors"] },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    { $render: [{ type: "Profile" }] },
                  ],
                },
              },
            },
            {
              type: "Route",
              props: {
                exact: true,
                path: "/profile/:username/favorites",
                render: {
                  $pipe: [
                    { $get: ["match.params.username"] },
                    {
                      $pass: [
                        {
                          $unless: [
                            {
                              $equals: [
                                { $val: [{ $getData: ["profile.username"] }] },
                              ],
                            },
                            {
                              $pipe: [
                                { $of: [] },
                                {
                                  $prepend: [
                                    "https://conduit.productionready.io/api/profiles/",
                                  ],
                                },
                                { $join: [""] },
                                { $objOf: ["url"] },
                                { $mergeRight: [{ method: "get" }] },
                                { $axios: [] },
                                {
                                  $andThen: [
                                    {
                                      $pipe: [
                                        { $get: ["data.profile"] },
                                        { $setData: ["profile"] },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  $otherwise: [
                                    {
                                      $pipe: [
                                        { $get: ["response.data.errors"] },
                                        { $setData: ["errors"] },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      $unless: [
                        {
                          $pipe: [
                            { $getData: ["selectedList"] },
                            { $equals: ["favoritedList"] },
                          ],
                        },
                        {
                          $pipe: [
                            { $of: [] },
                            {
                              $prepend: [
                                "https://conduit.productionready.io/api/articles?favorited=",
                              ],
                            },
                            {
                              $append: [
                                {
                                  $val: [
                                    { $getData: ["selectedPageIndex"] },
                                    { $multiply: [10] },
                                    { $of: [] },
                                    { $prepend: ["&offset="] },
                                    { $join: [""] },
                                  ],
                                },
                              ],
                            },
                            { $join: [""] },
                            { $objOf: ["url"] },
                            { $mergeRight: [{ method: "get" }] },
                            { $axios: [] },
                            {
                              $andThen: [
                                {
                                  $pipe: [
                                    {
                                      $pass: [
                                        {
                                          $setData: [
                                            "selectedList",
                                            "favoritedList",
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      $pass: [
                                        { $get: ["data.articles"] },
                                        { $setData: ["favoritedList"] },
                                      ],
                                    },
                                    { $get: ["data.articlesCount"] },
                                    { $setData: ["articlesCount"] },
                                  ],
                                },
                              ],
                            },
                            {
                              $otherwise: [
                                {
                                  $pipe: [
                                    { $get: ["response.data.errors"] },
                                    { $setData: ["errors"] },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    { $render: [{ type: "Profile" }] },
                  ],
                },
              },
            },
            {
              type: "Route",
              props: {
                exact: true,
                path: "/login",
                render: {
                  $pipe: [
                    { $getToken: ["jwt"] },
                    {
                      $ifElse: [
                        { $isEmpty: [] },
                        { $render: [{ type: "Login" }] },
                        { $render: [{ type: "Redirect", props: { to: "/" } }] },
                      ],
                    },
                  ],
                },
              },
            },
            {
              type: "Route",
              props: {
                exact: true,
                path: "/register",
                render: {
                  $pipe: [
                    { $getToken: ["jwt"] },
                    {
                      $ifElse: [
                        { $isEmpty: [] },
                        { $render: [{ type: "Register" }] },
                        { $render: [{ type: "Redirect", props: { to: "/" } }] },
                      ],
                    },
                  ],
                },
              },
            },
            {
              type: "Route",
              props: {
                exact: true,
                path: "/settings",
                render: {
                  $pipe: [
                    { $getToken: ["jwt"] },
                    {
                      $ifElse: [
                        { $isEmpty: [] },
                        { $render: [{ type: "Redirect", props: { to: "/" } }] },
                        { $render: [{ type: "Settings" }] },
                      ],
                    },
                  ],
                },
              },
            },
            {
              type: "Route",
              props: {
                exact: true,
                path: "/editor",
                render: {
                  $pipe: [
                    { $getToken: ["jwt"] },
                    {
                      $ifElse: [
                        { $isEmpty: [] },
                        { $render: [{ type: "Redirect", props: { to: "/" } }] },
                        {
                          $pipe: [
                            { $getData: ["draft.article.slug"] },
                            {
                              $unless: [
                                { $isEmpty: [] },
                                { $setData: ["draft.article", null] },
                              ],
                            },
                            { $render: [{ type: "Editor" }] },
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
            },
            {
              type: "Route",
              props: {
                exact: true,
                path: "/editor/:slug",
                render: {
                  $pipe: [
                    { $get: ["match.params.slug"] },
                    {
                      $ifElse: [
                        { $pipe: [{ $getToken: ["jwt"] }, { $isEmpty: [] }] },
                        { $render: [{ type: "Redirect", props: { to: "/" } }] },
                        {
                          $pipe: [
                            {
                              $unless: [
                                {
                                  $equals: [
                                    {
                                      $val: [
                                        { $getData: ["draft.article.slug"] },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  $pipe: [
                                    { $of: [] },
                                    {
                                      $prepend: [
                                        "https://conduit.productionready.io/api/articles/",
                                      ],
                                    },
                                    { $join: [""] },
                                    { $objOf: ["url"] },
                                    { $mergeRight: [{ method: "get" }] },
                                    { $axios: [] },
                                    {
                                      $andThen: [
                                        {
                                          $pipe: [
                                            { $get: ["data.article"] },
                                            { $setData: ["draft.article"] },
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      $otherwise: [
                                        {
                                          $pipe: [
                                            { $get: ["response.data.errors"] },
                                            { $setData: ["errors"] },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              $render: [
                                {
                                  type: "Editor",
                                  props: {
                                    article: {
                                      $val: [{ $getData: ["draft.article"] }],
                                    },
                                  },
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
            },
            {
              type: "Route",
              props: {
                exact: true,
                path: "/article/:slug",
                render: {
                  $pipe: [
                    { $get: ["match.params.slug"] },
                    {
                      $unless: [
                        {
                          $equals: [{ $val: [{ $getData: ["article.slug"] }] }],
                        },
                        {
                          $pipe: [
                            { $of: [] },
                            {
                              $prepend: [
                                "https://conduit.productionready.io/api/articles/",
                              ],
                            },
                            {
                              $pass: [
                                { $join: [""] },
                                { $objOf: ["url"] },
                                { $mergeRight: [{ method: "get" }] },
                                { $axios: [] },
                                {
                                  $andThen: [
                                    {
                                      $pipe: [
                                        { $get: ["data.article"] },
                                        { $setData: ["article"] },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  $otherwise: [
                                    {
                                      $pipe: [
                                        { $get: ["response.data.errors"] },
                                        { $setData: ["errors"] },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              $pass: [
                                { $append: ["/comments"] },
                                { $join: [""] },
                                { $objOf: ["url"] },
                                { $mergeRight: [{ method: "get" }] },
                                { $axios: [] },
                                {
                                  $andThen: [
                                    {
                                      $pipe: [
                                        { $get: ["data.comments"] },
                                        { $setData: ["commentList"] },
                                        { $setData: ["draft.comment", null] },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  $otherwise: [
                                    {
                                      $pipe: [
                                        { $get: ["response.data.errors"] },
                                        { $setData: ["errors"] },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      $render: [
                        {
                          type: "Article",
                          props: {
                            article: { $val: [{ $getData: ["article"] }] },
                          },
                        },
                      ],
                    },
                  ],
                },
              },
            },
          ],
        },
        { type: "Footer" },
        { type: "ForkMe" },
      ],
      props: { style: { height: "100%", overflow: "auto" } },
    },
  ],
};
export const Footer = {
  type: "div",
  props: {
    style: {
      height: "66px",
    },
  },
};
export const Profile = {
  type: "div",
  children: [
    {
      type: "div",
      children: [
        {
          type: "div",
          children: [
            {
              type: "div",
              children: [
                {
                  type: "div",
                  children: [
                    {
                      type: "img",
                      props: {
                        alt: { $val: [{ $getData: ["profile.username"] }] },
                        className: "user-img",
                        src: { $val: [{ $getData: ["profile.image"] }] },
                      },
                    },
                    {
                      type: "h4",
                      children: { $val: [{ $getData: ["profile.username"] }] },
                    },
                    {
                      type: "p",
                      children: [{ $val: [{ $getData: ["profile.bio"] }] }],
                    },
                    {
                      $val: [
                        { $getData: ["profile.username"] },
                        {
                          $ifElse: [
                            {
                              $equals: [
                                { $val: [{ $getData: ["user.username"] }] },
                              ],
                            },
                            {
                              $always: [
                                {
                                  type: "Link",
                                  children: [
                                    {
                                      type: "i",
                                      props: { className: "ion-gear-a" },
                                    },
                                    " ",
                                    "Edit Profile Settings",
                                  ],
                                  props: {
                                    className:
                                      "btn btn-sm btn-outline-secondary action-btn",
                                    to: "/settings",
                                  },
                                },
                              ],
                            },
                            {
                              $always: [
                                {
                                  type: "button",
                                  children: [
                                    {
                                      type: "i",
                                      props: {
                                        className: "ion-plus-round",
                                      },
                                    },
                                    " ",
                                    {
                                      $val: [
                                        { $getData: ["profile.following"] },
                                        {
                                          $ifElse: [
                                            { $equals: [true] },
                                            { $always: ["Unfollow"] },
                                            { $always: ["Follow"] },
                                          ],
                                        },
                                      ],
                                    },
                                    " ",
                                    {
                                      $val: [
                                        { $getData: ["profile.username"] },
                                      ],
                                    },
                                  ],
                                  props: {
                                    className: [
                                      {
                                        $val: [
                                          {
                                            $getData: ["profile.following"],
                                          },
                                          {
                                            $ifElse: [
                                              { $equals: [true] },
                                              {
                                                $always: [
                                                  "btn btn-sm action-btn btn-secondary",
                                                ],
                                              },
                                              {
                                                $always: [
                                                  "btn btn-sm action-btn btn-outline-secondary",
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                    onClick: {
                                      $pipe: [
                                        { $getToken: ["jwt"] },
                                        {
                                          $ifElse: [
                                            { $isEmpty: [] },
                                            { $history: ["#/login"] },
                                            {
                                              $pipe: [
                                                {
                                                  $getData: [
                                                    "profile.username",
                                                  ],
                                                },
                                                { $of: [] },
                                                {
                                                  $pass: [
                                                    {
                                                      $prepend: [
                                                        "https://conduit.productionready.io/api/profiles/",
                                                      ],
                                                    },
                                                    {
                                                      $append: ["/follow"],
                                                    },
                                                    { $join: [""] },
                                                    { $objOf: ["url"] },
                                                    {
                                                      $mergeRight: [
                                                        {
                                                          method: {
                                                            $val: [
                                                              {
                                                                $getData: [
                                                                  "profile.following",
                                                                ],
                                                              },
                                                              {
                                                                $ifElse: [
                                                                  {
                                                                    $equals: [
                                                                      true,
                                                                    ],
                                                                  },
                                                                  {
                                                                    $always: [
                                                                      "delete",
                                                                    ],
                                                                  },
                                                                  {
                                                                    $always: [
                                                                      "post",
                                                                    ],
                                                                  },
                                                                ],
                                                              },
                                                            ],
                                                          },
                                                        },
                                                      ],
                                                    },
                                                    { $axios: [] },
                                                    {
                                                      $andThen: [
                                                        {
                                                          $pipe: [
                                                            {
                                                              $get: [
                                                                "data.profile",
                                                              ],
                                                            },
                                                            {
                                                              $setData: [
                                                                "profile",
                                                              ],
                                                            },
                                                          ],
                                                        },
                                                      ],
                                                    },
                                                    {
                                                      $andThen: [
                                                        {
                                                          $pass: [
                                                            {
                                                              $axios: [
                                                                {
                                                                  method: "get",
                                                                  url: "https://conduit.productionready.io/api/articles/feed",
                                                                },
                                                              ],
                                                            },
                                                            {
                                                              $andThen: [
                                                                {
                                                                  $pass: [
                                                                    {
                                                                      $get: [
                                                                        "data.articles",
                                                                      ],
                                                                    },
                                                                    {
                                                                      $setData:
                                                                        [
                                                                          "feedList",
                                                                        ],
                                                                    },
                                                                  ],
                                                                },
                                                              ],
                                                            },
                                                          ],
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  },
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  props: { className: "col-xs-12 col-md-10 offset-md-1" },
                },
              ],
              props: { className: "row" },
            },
          ],
          props: { className: "container" },
        },
      ],
      props: { className: "user-info" },
    },
    {
      type: "div",
      children: [
        {
          type: "div",
          children: [
            {
              type: "div",
              children: [
                {
                  type: "div",
                  children: [
                    {
                      type: "ul",
                      children: [
                        { type: "MyArticlesTab" },
                        { type: "FavoritesTab" },
                      ],
                      props: { className: "nav nav-pills outline-active" },
                    },
                  ],
                  props: { className: "articles-toggle" },
                },
                { type: "ArticleList" },
              ],
              props: { className: "col-xs-12 col-md-10 offset-md-1" },
            },
          ],
          props: { className: "row" },
        },
      ],
      props: { className: "container" },
    },
  ],
  props: { className: "profile-page" },
};

export const MyArticlesTab = {
  type: "li",
  children: [
    {
      type: "Link",
      children: "My Articles",
      props: {
        to: {
          $val: [
            { $getData: ["profile.username"] },
            { $of: [] },
            { $prepend: ["/profile/"] },
            { $join: [""] },
          ],
        },
        className: {
          $val: [
            { $getData: ["selectedList"] },
            {
              $ifElse: [
                { $equals: ["authoredList"] },
                { $always: ["nav-link active"] },
                { $always: ["nav-link"] },
              ],
            },
          ],
        },
      },
    },
  ],
  props: { className: "nav-item" },
};

export const FavoritesTab = {
  type: "li",
  children: [
    {
      type: "Link",
      children: "Favorites",
      props: {
        className: {
          $val: [
            { $getData: ["selectedList"] },
            {
              $ifElse: [
                { $equals: ["favoritedList"] },
                { $always: ["nav-link active"] },
                { $always: ["nav-link"] },
              ],
            },
          ],
        },
        to: {
          $val: [
            { $getData: ["profile.username"] },
            { $of: [] },
            { $prepend: ["/profile/"] },
            { $append: ["/favorites"] },
            { $join: [""] },
          ],
        },
      },
    },
  ],
  props: { className: "nav-item" },
};

export const Login = {
  type: "div",
  children: [
    {
      type: "div",
      children: [
        {
          type: "div",
          children: [
            {
              type: "div",
              children: [
                {
                  type: "h1",
                  children: "Sign In",
                  props: { className: "text-xs-center" },
                },
                {
                  type: "p",
                  children: [
                    {
                      type: "Link",
                      children: "Need an account?",
                      props: { to: "/register" },
                    },
                  ],
                  props: { className: "text-xs-center" },
                },
                { type: "ListErrors" },
                {
                  type: "form",
                  children: [
                    {
                      type: "fieldset",
                      children: [
                        {
                          type: "fieldset",
                          children: [
                            {
                              type: "input",
                              props: {
                                type: "email",
                                autoComplete: "username",
                                className: "form-control form-control-lg",
                                onChange: {
                                  $pipe: [
                                    { $get: ["target.value"] },
                                    { $setData: ["draft.user.email"] },
                                  ],
                                },
                                placeholder: "Email",
                                value: {
                                  $val: [{ $getData: ["draft.user.email"] }],
                                },
                              },
                            },
                          ],
                          props: { className: "form-group" },
                        },
                        {
                          type: "fieldset",
                          children: [
                            {
                              type: "input",
                              props: {
                                type: "password",
                                autoComplete: "current-password",
                                className: "form-control form-control-lg",
                                onChange: {
                                  $pipe: [
                                    { $get: ["target.value"] },
                                    { $setData: ["draft.user.password"] },
                                  ],
                                },
                                placeholder: "Password",
                                value: {
                                  $val: [{ $getData: ["draft.user.password"] }],
                                },
                              },
                            },
                          ],
                          props: { className: "form-group" },
                        },
                        {
                          type: "button",
                          children: ["Sign in"],
                          props: {
                            type: "submit",
                            className: "btn btn-lg btn-primary pull-xs-right",
                          },
                        },
                      ],
                    },
                  ],
                  props: {
                    onSubmit: {
                      $pipe: [
                        { $preventDefault: [] },
                        { $getData: ["draft.user"] },
                        {
                          $applySpec: [
                            {
                              data: {
                                user: {
                                  email: { $get: ["email"] },
                                  password: { $get: ["password"] },
                                },
                              },
                            },
                          ],
                        },
                        {
                          $mergeRight: [
                            {
                              method: "post",
                              url: "https://conduit.productionready.io/api/users/login",
                            },
                          ],
                        },
                        { $axios: [] },
                        {
                          $andThen: [
                            {
                              $pipe: [
                                { $get: ["data.user.token"] },
                                { $setToken: ["jwt"] },
                                { $history: ["#"] },
                              ],
                            },
                          ],
                        },
                        {
                          $otherwise: [
                            {
                              $pipe: [
                                { $get: ["response.data.errors"] },
                                { $setData: ["errors"] },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  },
                },
              ],
              props: { className: "col-md-6 offset-md-3 col-xs-12" },
            },
          ],
          props: { className: "row" },
        },
      ],
      props: { className: "container page" },
    },
  ],
  props: { className: "auth-page" },
};

export const Settings = {
  type: "div",
  children: [
    {
      type: "div",
      children: [
        {
          type: "div",
          children: [
            {
              type: "div",
              children: [
                {
                  type: "h1",
                  children: "Your Settings",
                  props: { className: "text-xs-center" },
                },
                { type: "ListErrors" },
                {
                  type: "div",
                  children: [
                    {
                      type: "fieldset",
                      children: [
                        {
                          type: "fieldset",
                          children: [
                            {
                              type: "input",
                              props: {
                                type: "text",
                                className: "form-control",
                                onChange: {
                                  $pipe: [
                                    { $get: ["target.value"] },
                                    { $setData: ["draft.user.image"] },
                                  ],
                                },
                                placeholder: "URL of profile picture",
                                value: {
                                  $val: [{ $getData: ["draft.user.image"] }],
                                },
                              },
                            },
                          ],
                          props: { className: "form-group" },
                        },
                        {
                          type: "fieldset",
                          children: [
                            {
                              type: "input",
                              props: {
                                type: "text",
                                className: "form-control form-control-lg",
                                onChange: {
                                  $pipe: [
                                    { $get: ["target.value"] },
                                    { $setData: ["draft.user.username"] },
                                  ],
                                },
                                placeholder: "Username",
                                value: {
                                  $val: [{ $getData: ["draft.user.username"] }],
                                },
                              },
                            },
                          ],
                          props: { className: "form-group" },
                        },
                        {
                          type: "fieldset",
                          children: [
                            {
                              type: "textarea",
                              props: {
                                type: "text",
                                className: "form-control form-control-lg",
                                onChange: {
                                  $pipe: [
                                    { $get: ["target.value"] },
                                    { $setData: ["draft.user.bio"] },
                                  ],
                                },
                                placeholder: "Short bio about you",
                                rows: "8",
                                value: {
                                  $val: [{ $getData: ["draft.user.bio"] }],
                                },
                              },
                            },
                          ],
                          props: { className: "form-group" },
                        },
                        {
                          type: "fieldset",
                          children: [
                            {
                              type: "input",
                              props: {
                                type: "email",
                                autoComplete: "username",
                                className: "form-control form-control-lg",
                                onChange: {
                                  $pipe: [
                                    { $get: ["target.value"] },
                                    { $setData: ["draft.user.email"] },
                                  ],
                                },
                                placeholder: "Email",
                                value: {
                                  $val: [{ $getData: ["draft.user.email"] }],
                                },
                              },
                            },
                          ],
                          props: { className: "form-group" },
                        },
                        {
                          type: "fieldset",
                          children: [
                            {
                              type: "input",
                              props: {
                                type: "password",
                                autoComplete: "current-password",
                                className: "form-control form-control-lg",
                                onChange: {
                                  $pipe: [
                                    { $get: ["target.value"] },
                                    { $setData: ["draft.user.password"] },
                                  ],
                                },
                                placeholder: "New Password",
                                value: {
                                  $val: [{ $getData: ["draft.user.password"] }],
                                },
                              },
                            },
                          ],
                          props: { className: "form-group" },
                        },
                        {
                          type: "button",
                          children: "Update Settings",
                          props: {
                            type: "button",
                            className: "btn btn-lg btn-primary pull-xs-right",
                            disabled: {
                              $val: [
                                {
                                  $pipe: [
                                    { $getData: ["user"] },
                                    {
                                      $equals: [
                                        {
                                          $val: [{ $getData: ["draft.user"] }],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            onClick: {
                              $pipe: [
                                {
                                  $axios: [
                                    {
                                      data: {
                                        user: {
                                          $val: [{ $getData: ["draft.user"] }],
                                        },
                                      },
                                      method: "put",
                                      url: "https://conduit.productionready.io/api/user",
                                    },
                                  ],
                                },
                                {
                                  $andThen: [
                                    {
                                      $pipe: [
                                        { $get: ["data.user"] },
                                        {
                                          $pass: [
                                            { $get: ["token"] },
                                            { $setToken: ["jwt"] },
                                          ],
                                        },
                                        { $pass: [{ $setData: ["user"] }] },
                                        {
                                          $pass: [{ $setData: ["draft.user"] }],
                                        },
                                        { $get: ["username"] },
                                        { $of: [] },
                                        { $prepend: ["#/profile/"] },
                                        { $join: [""] },
                                        { $history: [] },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  $otherwise: [
                                    {
                                      $pipe: [
                                        { $get: ["response.data.errors"] },
                                        { $setData: ["errors"] },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
                { type: "hr" },
                {
                  type: "button",
                  children: ["Or click here to logout."],
                  props: {
                    className: "btn btn-outline-danger",
                    onClick: {
                      $pipe: [
                        { $clearToken: ["jwt"] },
                        { $resetData: [] },
                        { $history: ["#"] },
                      ],
                    },
                  },
                },
              ],
              props: { className: "col-md-6 offset-md-3 col-xs-12" },
            },
          ],
          props: { className: "row" },
        },
      ],
      props: { className: "container page" },
    },
  ],
  props: { className: "settings-page" },
};

export const Register = {
  type: "div",
  children: [
    {
      type: "div",
      children: [
        {
          type: "div",
          children: [
            {
              type: "div",
              children: [
                {
                  type: "h1",
                  children: "Sign Up",
                  props: { className: "text-xs-center" },
                },
                {
                  type: "p",
                  children: [
                    {
                      type: "Link",
                      children: "Have an account?",
                      props: { to: "/login" },
                    },
                  ],
                  props: { className: "text-xs-center" },
                },
                { type: "ListErrors" },
                {
                  type: "form",
                  children: [
                    {
                      type: "fieldset",
                      children: [
                        {
                          type: "fieldset",
                          children: [
                            {
                              type: "input",
                              props: {
                                type: "text",
                                className: "form-control form-control-lg",
                                onChange: {
                                  $pipe: [
                                    { $get: ["target.value"] },
                                    { $setData: ["draft.user.username"] },
                                  ],
                                },
                                placeholder: "Username",
                                value: {
                                  $val: [{ $getData: ["draft.user.username"] }],
                                },
                              },
                            },
                          ],
                          props: { className: "form-group" },
                        },
                        {
                          type: "fieldset",
                          children: [
                            {
                              type: "input",
                              props: {
                                type: "email",
                                autoComplete: "username",
                                className: "form-control form-control-lg",
                                onChange: {
                                  $pipe: [
                                    { $get: ["target.value"] },
                                    { $setData: ["draft.user.email"] },
                                  ],
                                },
                                placeholder: "Email",
                                value: {
                                  $val: [{ $getData: ["draft.user.email"] }],
                                },
                              },
                            },
                          ],
                          props: { className: "form-group" },
                        },
                        {
                          type: "fieldset",
                          children: [
                            {
                              type: "input",
                              props: {
                                type: "password",
                                autoComplete: "current-password",
                                className: "form-control form-control-lg",
                                onChange: {
                                  $pipe: [
                                    { $get: ["target.value"] },
                                    { $setData: ["draft.user.password"] },
                                  ],
                                },
                                placeholder: "Password",
                                value: {
                                  $val: [{ $getData: ["draft.user.password"] }],
                                },
                              },
                            },
                          ],
                          props: { className: "form-group" },
                        },
                        {
                          type: "button",
                          children: ["Sign up"],
                          props: {
                            type: "submit",
                            className: "btn btn-lg btn-primary pull-xs-right",
                          },
                        },
                      ],
                    },
                  ],
                  props: {
                    onSubmit: {
                      $pipe: [
                        { $preventDefault: [] },
                        { $getData: ["draft.user"] },
                        {
                          $applySpec: [
                            {
                              data: {
                                user: {
                                  email: { $get: ["email"] },
                                  password: { $get: ["password"] },
                                  username: { $get: ["username"] },
                                },
                              },
                            },
                          ],
                        },
                        {
                          $mergeRight: [
                            {
                              method: "post",
                              url: "https://conduit.productionready.io/api/users",
                            },
                          ],
                        },
                        { $axios: [] },
                        {
                          $andThen: [
                            {
                              $pipe: [
                                { $get: ["data.user.token"] },
                                { $setToken: ["jwt"] },
                                { $history: ["#"] },
                              ],
                            },
                          ],
                        },
                        {
                          $otherwise: [
                            {
                              $pipe: [
                                { $get: ["response.data.errors"] },
                                { $setData: ["errors"] },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  },
                },
              ],
              props: { className: "col-md-6 offset-md-3 col-xs-12" },
            },
          ],
          props: { className: "row" },
        },
      ],
      props: { className: "container page" },
    },
  ],
  props: { className: "auth-page" },
};

export const ListErrors = {
  type: "ul",
  children: {
    $val: [
      { $getData: ["errors"] },
      { $toPairs: [] },
      {
        $map: [
          {
            $pipe: [
              { $join: [" "] },
              { $split: [","] },
              { $objOf: ["children"] },
              { $mergeDeepRight: [{ type: "li" }] },
            ],
          },
        ],
      },
    ],
  },
  props: { className: "error-messages" },
};
export const ArticleList = {
  type: "div",
  children: [
    {
      type: "div",
      children: {
        $val: [
          { $getData: [{ $val: [{ $getData: ["selectedList"] }] }] },
          {
            $ifElse: [
              { $isEmpty: [] },
              {
                $always: [
                  {
                    type: "div",
                    children: ["No articles are here... yet."],
                    props: {
                      style: { padding: "1.5rem 0", position: "absolute" },
                    },
                  },
                ],
              },
              {
                $pipe: [
                  {
                    $mapObjIndexed: [
                      {
                        $pipe: [
                          { $spread: [] },
                          {
                            $applySpec: [
                              {
                                props: {
                                  article: { $get: ["0"] },
                                  articleIndex: { $get: ["1"] },
                                },
                              },
                            ],
                          },
                          {
                            $ifElse: [
                              {
                                $pipe: [
                                  { $getData: ["selectedList"] },
                                  { $isEmpty: [] },
                                ],
                              },
                              { $always: [null] },
                              {
                                $mergeDeepRight: [
                                  {
                                    type: "ArticlePreview",
                                    props: {
                                      list: {
                                        $val: [{ $getData: ["selectedList"] }],
                                      },
                                    },
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  { $values: [] },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      type: "div",
      children: [{ type: "ListPagination" }],
    },
  ],
};
export const ListPagination = {
  type: "nav",
  children: [
    {
      $val: [
        { $getData: ["articlesCount"] },
        {
          $ifElse: [
            { $lte: [10] },
            {
              $always: [
                {
                  type: "ul",
                  children: {
                    $val: [
                      { $getData: ["articlesCount"] },
                      { $multiply: [0.1] },
                      { $ceil: [] },
                      { $repeat: [""] },
                      {
                        $mapObjIndexed: [
                          {
                            $pipe: [
                              { $spread: [] },
                              {
                                $applySpec: [
                                  { props: { pageNumber: { $get: ["1"] } } },
                                ],
                              },
                              {
                                $mergeDeepRight: [{ type: "PaginationItem" }],
                              },
                            ],
                          },
                        ],
                      },
                      { $values: [] },
                    ],
                  },
                  props: { className: "pagination" },
                },
              ],
            },
            { $always: [null] },
          ],
        },
      ],
    },
  ],
};
export const PaginationItem = {
  type: "li",
  children: {
    type: "a",
    children: { $val: [{ $inc: ["{{pageNumber}}"] }] },
    props: {
      className: "page-link",
      onClick: {
        $pipe: [
          { $setData: ["selectedPageIndex", "{{pageNumber}}"] },
          { $setData: ["selectedList", null] },
        ],
      },
    },
  },
  props: {
    className: {
      $val: [
        "{{pageNumber}}",
        {
          $ifElse: [
            { $equals: [{ $val: [{ $getData: ["selectedPageIndex"] }] }] },
            { $always: ["page-item active"] },
            { $always: ["page-item"] },
          ],
        },
      ],
    },
  },
};
export const ArticlePreview = {
  type: "div",
  children: [
    {
      type: "div",
      children: [
        {
          type: "Link",
          children: [
            {
              type: "img",
              props: {
                alt: "{{article.author.username}}",
                src: "{{article.author.image}}",
              },
            },
          ],
          props: { to: "/profile/{{article.author.username}}" },
        },
        {
          type: "div",
          children: [
            {
              type: "Link",
              children: "{{article.author.username}}",
              props: {
                className: "author",
                to: "/profile/{{article.author.username}}",
              },
            },
            {
              type: "span",
              children: {
                $val: [
                  "{{article}}",
                  { $get: ["updatedAt"] },
                  { $toDateString: [] },
                ],
              },
              props: { className: "date" },
            },
          ],
          props: { className: "info" },
        },
        {
          type: "div",
          children: {
            type: "button",
            children: [
              { type: "i", props: { className: "ion-heart" } },
              " ",
              {
                $val: [
                  "{{article.favoritesCount}}",
                  {
                    $ifElse: [
                      { $equals: [0] },
                      { $always: ["0"] },
                      { $always: ["{{article.favoritesCount}}"] },
                    ],
                  },
                ],
              },
            ],
            props: {
              className: {
                $val: [
                  "{{article}}",
                  { $get: ["favorited"] },
                  {
                    $ifElse: [
                      { $equals: [true] },
                      { $always: ["btn btn-sm btn-primary"] },
                      { $always: ["btn btn-sm btn-outline-primary"] },
                    ],
                  },
                ],
              },
              onClick: {
                $ifElse: [
                  { $pipe: [{ $getToken: ["jwt"] }, { $isEmpty: [] }] },
                  { $history: ["#/login"] },
                  {
                    $pipe: [
                      { $getData: ["{{list}}"] },
                      { $get: ["{{articleIndex}}"] },
                      { $get: ["favorited"] },
                      {
                        $ifElse: [
                          { $equals: [true] },
                          { $always: [{ method: "delete" }] },
                          { $always: [{ method: "post" }] },
                        ],
                      },
                      {
                        $mergeRight: [
                          {
                            url: "https://conduit.productionready.io/api/articles/{{article.slug}}/favorite",
                          },
                        ],
                      },
                      { $axios: [] },
                      {
                        $andThen: [
                          {
                            $pipe: [
                              { $get: ["data.article"] },
                              {
                                $pass: [
                                  {
                                    $setData: [
                                      {
                                        $val: [
                                          "{{list}}",
                                          { $of: [] },
                                          { $append: [".{{articleIndex}}"] },
                                          { $join: [""] },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                $when: [
                                  {
                                    $pipe: [
                                      { $getData: ["selectedList"] },
                                      { $equals: ["favoritedList"] },
                                    ],
                                  },
                                  { $setData: ["selectedList", null] },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                      {
                        $otherwise: [
                          {
                            $pipe: [
                              { $get: ["response.data.errors"] },
                              { $setData: ["errors"] },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            },
          },
          props: { className: "pull-xs-right" },
        },
      ],
      props: { className: "article-meta" },
    },
    {
      type: "div",
      children: [
        { type: "h1", children: "{{article.title}}" },
        { type: "p", children: "{{article.description}}" },
        {
          type: "span",
          children: [
            {
              type: "Link",
              children: ["Read more..."],
              props: {
                to: {
                  $val: [
                    "{{article.slug}}",
                    { $of: [] },
                    { $prepend: ["/article/"] },
                    { $join: [""] },
                  ],
                },
              },
            },
          ],
        },
        {
          type: "ul",
          children: {
            $val: [
              "{{article.tagList}}",
              {
                $map: [
                  {
                    $pipe: [
                      { $objOf: ["value"] },
                      { $objOf: ["props"] },
                      {
                        $mergeDeepRight: [
                          {
                            type: "Tag",
                            props: {
                              className: "tag-default tag-pill tag-outline",
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          props: { className: "tag-list" },
        },
      ],
      props: { className: "preview-link" },
    },
  ],
  props: { className: "article-preview" },
};

export const GlobalFeedTab = {
  type: "li",
  props: {
    className: "nav-item",
  },
  children: [
    {
      type: "Link",
      children: "Global Feed",
      props: {
        className: {
          $val: [
            { $getData: ["selectedList"] },
            {
              $ifElse: [
                { $equals: ["globalList"] },
                { $always: ["nav-link active"] },
                { $always: ["nav-link"] },
              ],
            },
          ],
        },
        to: "/",
      },
    },
  ],
};
export const YourFeedTab = {
  type: "li",
  children: [
    {
      type: "Link",
      children: "Your Feed",
      props: {
        className: {
          $val: [
            { $getData: ["selectedList"] },
            {
              $ifElse: [
                { $equals: ["feedList"] },
                { $always: ["nav-link active"] },
                { $always: ["nav-link"] },
              ],
            },
          ],
        },
        to: "/feed",
      },
    },
  ],
  props: { className: "nav-item" },
};

export const FilterFeedTab = {
  type: "li",
  children: {
    $val: [
      { $getData: ["selectedList"] },
      {
        $ifElse: [
          { $equals: ["filteredList"] },
          {
            $always: [
              {
                type: "a",
                children: ["#", " ", { $val: [{ $getData: ["selectedTag"] }] }],
                props: { href: "#0", className: "nav-link active" },
              },
            ],
          },
          { $always: [null] },
        ],
      },
    ],
  },
  props: { className: "nav-item" },
};
export const Article = {
  type: "div",
  children: [
    {
      type: "div",
      children: [
        {
          type: "div",
          children: [
            {
              type: "h1",
              children: [{ $val: [{ $getData: ["article.title"] }] }],
            },
            {
              type: "ArticleMeta",
              props: {
                article: { $val: [{ $getData: ["article"] }] },
              },
            },
          ],
          props: { className: "container" },
        },
      ],
      props: { className: "banner" },
    },
    {
      type: "div",
      children: [
        {
          type: "div",
          children: [
            {
              type: "div",
              children: [
                {
                  type: "div",
                  children: {
                    $val: [
                      { $getData: ["article.body"] },
                      {
                        $ifElse: [
                          { $isEmpty: [] },
                          { $always: [null] },
                          {
                            $always: [
                              {
                                type: "Markdown",
                                children: {
                                  $val: [{ $getData: ["article.body"] }],
                                },
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  props: { className: "markdown" },
                },
                {
                  type: "ul",
                  children: {
                    $val: [
                      { $getData: ["article.tagList"] },
                      {
                        $map: [
                          {
                            $pipe: [
                              { $objOf: ["value"] },
                              { $objOf: ["props"] },
                              {
                                $mergeDeepRight: [
                                  {
                                    type: "Tag",
                                    props: {
                                      className:
                                        "tag-default tag-pill tag-outline",
                                    },
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  props: { className: "tag-list" },
                },
              ],
              props: { className: "col-xs-12" },
            },
          ],
          props: { className: "row article-content" },
        },
        { type: "hr" },
        {
          type: "div",
          children: [{ type: "CommentContainer" }],
        },
      ],
      props: { className: "container page" },
    },
  ],
  props: { className: "article-page" },
};
export const CommentContainer = {
  type: "div",
  children: [
    {
      $val: [
        { $getToken: ["jwt"] },
        {
          $ifElse: [
            { $isEmpty: [] },
            {
              $always: [
                {
                  type: "div",
                  children: [
                    {
                      type: "p",
                      children: [
                        {
                          type: "Link",
                          children: "Sign in",
                          props: { to: "/login" },
                        },
                        " ",
                        "or",
                        " ",
                        {
                          type: "Link",
                          children: "sign up",
                          props: { to: "/register" },
                        },
                        " ",
                        "to add comments on this article.",
                      ],
                    },
                    { type: "CommentList" },
                  ],
                  props: { className: "col-xs-12 col-md-8 offset-md-2" },
                },
              ],
            },
            {
              $always: [
                {
                  type: "div",
                  children: [
                    {
                      type: "div",
                      children: [
                        { type: "ListErrors" },
                        { type: "CommentInput" },
                      ],
                    },
                    { type: "CommentList" },
                  ],
                  props: { className: "col-xs-12 col-md-8 offset-md-2" },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
export const Comment = {
  type: "div",
  children: [
    {
      type: "div",
      children: [
        {
          type: "p",
          children: ["{{comment.body}}"],
          props: { className: "card-text" },
        },
      ],
      props: { className: "card-block" },
    },
    {
      type: "div",
      children: [
        {
          type: "Link",
          children: [
            {
              type: "img",
              props: {
                className: "comment-author-img",
                src: "{{comment.author.image}}",
              },
            },
          ],
          props: {
            className: "comment-author",
            to: "/profile/{{comment.author.username}}",
          },
        },
        " ",
        {
          type: "Link",
          children: ["{{comment.author.username}}"],
          props: {
            className: "comment-author",
            to: "/profile/{{comment.author.username}}",
          },
        },
        {
          type: "span",
          children: { $val: ["{{comment.createdAt}}", { $toDateString: [] }] },
          props: { className: "date-posted" },
        },
        {
          type: "div",
          children: {
            $val: [
              { $getData: ["user.username"] },
              {
                $ifElse: [
                  { $equals: ["{{comment.author.username}}"] },
                  {
                    $always: [
                      {
                        type: "span",
                        children: [
                          {
                            type: "i",
                            props: {
                              className: "ion-trash-a",
                              onClick: {
                                $pipe: [
                                  { $getData: ["article.slug"] },
                                  { $of: [] },
                                  {
                                    $prepend: [
                                      "https://conduit.productionready.io/api/articles/",
                                    ],
                                  },
                                  { $append: ["/comments/"] },
                                  {
                                    $append: [
                                      {
                                        $val: [
                                          { $always: ["{{comment.id}}"] },
                                          { $toString: [] },
                                        ],
                                      },
                                    ],
                                  },
                                  { $join: [""] },
                                  { $objOf: ["url"] },
                                  { $mergeRight: [{ method: "delete" }] },
                                  { $axios: [] },
                                  {
                                    $andThen: [
                                      {
                                        $pipe: [
                                          { $getData: ["article.slug"] },
                                          { $of: [] },
                                          {
                                            $prepend: [
                                              "https://conduit.productionready.io/api/articles/",
                                            ],
                                          },
                                          { $append: ["/comments/"] },
                                          { $join: [""] },
                                          { $objOf: ["url"] },
                                          {
                                            $mergeRight: [{ method: "get" }],
                                          },
                                          { $axios: [] },
                                          {
                                            $andThen: [
                                              {
                                                $pipe: [
                                                  { $get: ["data.comments"] },
                                                  {
                                                    $setData: ["commentList"],
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                          {
                                            $otherwise: [
                                              {
                                                $pipe: [
                                                  {
                                                    $get: [
                                                      "response.data.errors",
                                                    ],
                                                  },
                                                  { $setData: ["errors"] },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                  {
                                    $otherwise: [
                                      {
                                        $pipe: [
                                          { $get: ["response.data.errors"] },
                                          { $setData: ["errors"] },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            },
                          },
                        ],
                        props: { className: "mod-options" },
                      },
                    ],
                  },
                  { $always: [null] },
                ],
              },
            ],
          },
        },
      ],
      props: { className: "card-footer" },
    },
  ],
  props: { className: "card" },
};
export const CommentInput = {
  type: "form",
  children: [
    {
      type: "div",
      children: [
        {
          type: "textarea",
          props: {
            className: "form-control",
            onChange: {
              $pipe: [
                { $get: ["target.value"] },
                { $setData: ["draft.comment"] },
              ],
            },
            placeholder: "Write a comment...",
            rows: "3",
            value: { $val: [{ $getData: ["draft.comment"] }] },
          },
        },
      ],
      props: { className: "card-block" },
    },
    {
      type: "div",
      children: [
        {
          type: "img",
          props: {
            alt: { $val: [{ $getData: ["user.username"] }] },
            className: "comment-author-img",
            src: { $val: [{ $getData: ["user.image"] }] },
          },
        },
        {
          type: "button",
          children: "Post Comment",
          props: {
            type: "submit",
            className: "btn btn-sm btn-primary",
            disabled: {
              $val: [{ $getData: ["draft.comment"] }, { $isEmpty: [] }],
            },
          },
        },
      ],
      props: { className: "card-footer" },
    },
  ],
  props: {
    className: "card comment-form",
    onSubmit: {
      $pipe: [
        { $preventDefault: [] },
        { $getData: ["article.slug"] },
        { $of: [] },
        { $prepend: ["https://conduit.productionready.io/api/articles/"] },
        { $append: ["/comments"] },
        { $join: [""] },
        { $objOf: ["url"] },
        {
          $mergeRight: [
            {
              data: {
                comment: {
                  author: { $val: [{ $getData: ["article.author"] }] },
                  body: { $val: [{ $getData: ["draft.comment"] }] },
                },
              },
              method: "post",
            },
          ],
        },
        { $axios: [] },
        {
          $andThen: [
            {
              $pipe: [
                { $getData: ["article.slug"] },
                { $of: [] },
                {
                  $prepend: [
                    "https://conduit.productionready.io/api/articles/",
                  ],
                },
                { $append: ["/comments"] },
                { $join: [""] },
                { $objOf: ["url"] },
                { $mergeRight: [{ method: "get" }] },
                { $axios: [] },
                {
                  $andThen: [
                    {
                      $pipe: [
                        { $get: ["data.comments"] },
                        { $setData: ["commentList"] },
                        { $setData: ["draft.comment", null] },
                      ],
                    },
                  ],
                },
                {
                  $otherwise: [
                    {
                      $pipe: [
                        { $get: ["response.data.errors"] },
                        { $setData: ["errors"] },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          $otherwise: [
            {
              $pipe: [
                { $get: ["response.data.errors"] },
                { $setData: ["errors"] },
              ],
            },
          ],
        },
      ],
    },
  },
};
export const ArticleActions = {
  type: "span",
  children: [
    {
      $val: [
        { $getData: ["article.author.username"] },
        {
          $ifElse: [
            {
              $pipe: [
                { $equals: [{ $val: [{ $getData: ["user.username"] }] }] },
              ],
            },
            {
              $always: [
                {
                  type: "Fragment",
                  children: [
                    {
                      type: "Link",
                      children: [
                        { type: "i", props: { className: "ion-edit" } },
                        " ",
                        "Edit Article",
                      ],
                      props: {
                        className: "btn btn-outline-secondary btn-sm",
                        to: {
                          $val: [
                            { $getData: ["article.slug"] },
                            { $of: [] },
                            { $prepend: ["/editor/"] },
                            { $join: [""] },
                          ],
                        },
                      },
                    },
                    " ",
                    {
                      type: "DeleteButton",
                      props: {
                        article: {
                          $val: [{ $getData: ["article"] }],
                        },
                      },
                    },
                  ],
                },
              ],
            },
            {
              $always: [
                {
                  type: "Fragment",
                  children: [
                    {
                      type: "button",
                      children: [
                        {
                          type: "i",
                          props: {
                            className: "ion-plus-round",
                          },
                        },
                        " ",
                        {
                          $val: [
                            { $getData: ["article.author.following"] },
                            {
                              $ifElse: [
                                { $equals: [true] },
                                { $always: ["Unfollow"] },
                                { $always: ["Follow"] },
                              ],
                            },
                          ],
                        },
                        " ",
                        {
                          $val: [{ $getData: ["article.author.username"] }],
                        },
                      ],
                      props: {
                        className: [
                          {
                            $val: [
                              {
                                $getData: ["article.author.following"],
                              },
                              {
                                $ifElse: [
                                  { $equals: [true] },
                                  {
                                    $always: [
                                      "btn btn-sm action-btn btn-secondary",
                                    ],
                                  },
                                  {
                                    $always: [
                                      "btn btn-sm action-btn btn-outline-secondary",
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                        onClick: {
                          $pipe: [
                            { $getToken: ["jwt"] },
                            {
                              $ifElse: [
                                { $isEmpty: [] },
                                { $history: ["#/login"] },
                                {
                                  $pipe: [
                                    { $getData: ["article.author.username"] },
                                    { $of: [] },
                                    {
                                      $pass: [
                                        {
                                          $prepend: [
                                            "https://conduit.productionready.io/api/profiles/",
                                          ],
                                        },
                                        {
                                          $append: ["/follow"],
                                        },
                                        { $join: [""] },
                                        { $objOf: ["url"] },
                                        {
                                          $mergeRight: [
                                            {
                                              method: {
                                                $val: [
                                                  {
                                                    $getData: [
                                                      "article.author.following",
                                                    ],
                                                  },
                                                  {
                                                    $ifElse: [
                                                      {
                                                        $equals: [true],
                                                      },
                                                      {
                                                        $always: ["delete"],
                                                      },
                                                      {
                                                        $always: ["post"],
                                                      },
                                                    ],
                                                  },
                                                ],
                                              },
                                            },
                                          ],
                                        },
                                        { $axios: [] },
                                        {
                                          $andThen: [
                                            {
                                              $pipe: [
                                                {
                                                  $get: ["data.profile"],
                                                },
                                                {
                                                  $setData: ["article.author"],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      },
                    },
                    " ",
                    {
                      type: "button",
                      children: [
                        { type: "i", props: { className: "ion-heart" } },
                        " ",
                        {
                          $val: [
                            { $getData: ["article.favorited"] },
                            {
                              $ifElse: [
                                { $equals: [true] },
                                { $always: ["Unfavorite"] },
                                { $always: ["Favorite"] },
                              ],
                            },
                          ],
                        },
                        " Article (",
                        { $val: [{ $getData: ["article.favoritesCount"] }] },
                        ")",
                      ],
                      props: {
                        className: {
                          $val: [
                            { $getData: ["article.favorited"] },
                            {
                              $ifElse: [
                                { $equals: [true] },
                                { $always: ["btn btn-sm btn-primary"] },
                                { $always: ["btn btn-sm btn-outline-primary"] },
                              ],
                            },
                          ],
                        },
                        onClick: {
                          $ifElse: [
                            {
                              $pipe: [{ $getToken: ["jwt"] }, { $isEmpty: [] }],
                            },
                            { $history: ["#/login"] },
                            {
                              $pipe: [
                                { $getData: ["article"] },
                                {
                                  $ifElse: [
                                    {
                                      $pipe: [
                                        { $get: ["favorited"] },
                                        { $equals: [true] },
                                      ],
                                    },
                                    {
                                      $pipe: [
                                        { $get: ["slug"] },
                                        { $of: [] },
                                        {
                                          $prepend: [
                                            "https://conduit.productionready.io/api/articles/",
                                          ],
                                        },
                                        { $append: ["/favorite"] },
                                        { $join: [""] },
                                        { $objOf: ["url"] },
                                        { $mergeRight: [{ method: "delete" }] },
                                      ],
                                    },
                                    {
                                      $pipe: [
                                        { $get: ["slug"] },
                                        { $of: [] },
                                        {
                                          $prepend: [
                                            "https://conduit.productionready.io/api/articles/",
                                          ],
                                        },
                                        { $append: ["/favorite"] },
                                        { $join: [""] },
                                        { $objOf: ["url"] },
                                        { $mergeRight: [{ method: "post" }] },
                                      ],
                                    },
                                  ],
                                },
                                { $axios: [] },
                                {
                                  $andThen: [
                                    {
                                      $pipe: [
                                        { $get: ["data.article"] },
                                        { $setData: ["article"] },
                                      ],
                                    },
                                  ],
                                },
                                {
                                  $otherwise: [
                                    {
                                      $pipe: [
                                        { $get: ["response.data.errors"] },
                                        { $setData: ["errors"] },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
export const DeleteButton = {
  type: "button",
  children: [
    { type: "i", props: { className: "ion-trash-a" } },
    " ",
    "Delete Article",
  ],
  props: {
    className: "btn btn-outline-danger btn-sm",
    onClick: {
      $pipe: [
        { $getData: ["article.slug"] },
        { $of: [] },
        { $prepend: ["https://conduit.productionready.io/api/articles/"] },
        { $join: [""] },
        { $objOf: ["url"] },
        { $mergeRight: [{ method: "delete" }] },
        { $axios: [] },
        { $andThen: [{ $history: ["#"] }] },
        {
          $otherwise: [
            {
              $pipe: [
                { $get: ["response.data.errors"] },
                { $setData: ["errors"] },
              ],
            },
          ],
        },
      ],
    },
  },
};
export const ArticleMeta = {
  type: "div",
  children: [
    {
      type: "Link",
      children: [
        {
          type: "img",
          props: {
            alt: { $val: [{ $getData: ["article.author.username"] }] },
            src: { $val: [{ $getData: ["article.author.image"] }] },
          },
        },
      ],
      props: {
        to: {
          $val: [
            { $getData: ["article.author.username"] },
            { $of: [] },
            { $prepend: ["/profile/"] },
            { $join: [""] },
          ],
        },
      },
    },
    {
      type: "div",
      children: [
        {
          type: "Link",
          children: { $val: [{ $getData: ["article.author.username"] }] },
          props: {
            className: "author",
            to: {
              $val: [
                { $getData: ["article.author.username"] },
                { $of: [] },
                { $prepend: ["/profile/"] },
                { $join: [""] },
              ],
            },
          },
        },
        {
          type: "span",
          children: {
            $val: [{ $getData: ["article.createdAt"] }, { $toDateString: [] }],
          },
          props: { className: "date" },
        },
      ],
      props: { className: "info" },
    },
    {
      type: "ArticleActions",
      props: { article: { $val: [{ $getData: ["article"] }] } },
    },
  ],
  props: { className: "article-meta" },
};
export const CommentList = {
  type: "div",
  children: {
    $val: [
      { $getData: ["commentList"] },
      {
        $mapObjIndexed: [
          {
            $pipe: [
              { $spread: [] },
              { $get: ["0"] },
              { $objOf: ["comment"] },
              { $objOf: ["props"] },
              { $mergeDeepRight: [{ type: "Comment" }] },
            ],
          },
        ],
      },
      { $values: [] },
    ],
  },
};
export const Tag = {
  type: "Link",
  children: ["{{value}}"],
  props: {
    className: "{{className}}",
    to: "/filter/{{value}}",
  },
};
export const CloseableTag = {
  type: "span",
  props: { className: "{{className}}" },
  children: [
    {
      type: "i",
      props: {
        className: "ion-close-round",
        onClick: {
          $pipe: [
            { $getData: ["draft.article.tagList"] },
            { $without: [["{{value}}"]] },
            { $setData: ["draft.article.tagList"] },
          ],
        },
        style: { margin: 0 },
      },
    },
    " ",
    "{{value}}",
  ],
};
export const Home = {
  type: "div",
  children: [
    {
      $val: [
        { $getToken: ["jwt"] },
        {
          $ifElse: [
            { $isEmpty: [] },
            { $always: [{ type: "Banner" }] },
            { $always: [null] },
          ],
        },
      ],
    },
    {
      type: "div",
      children: [
        {
          type: "div",
          children: [
            { type: "MainView" },
            {
              type: "div",
              children: [
                {
                  type: "div",
                  children: [
                    { type: "p", children: "Popular Tags" },
                    { type: "Tags" },
                  ],
                  props: { className: "sidebar" },
                },
              ],
              props: { className: "col-md-3" },
            },
          ],
          props: { className: "row" },
        },
      ],
      props: { className: "container page" },
    },
  ],
  props: { className: "home-page" },
};
export const MainView = {
  type: "div",
  children: [
    {
      type: "div",
      children: [
        {
          type: "ul",
          children: [
            {
              $val: [
                { $getToken: ["jwt"] },
                {
                  $unless: [
                    { $pipe: [{ $isEmpty: [] }] },
                    { $always: [{ type: "YourFeedTab" }] },
                  ],
                },
              ],
            },
            { type: "GlobalFeedTab" },
            { type: "FilterFeedTab" },
          ],
          props: { className: "nav nav-pills outline-active" },
        },
      ],
      props: { className: "feed-toggle" },
    },
    { type: "ArticleList" },
  ],
  props: { className: "col-md-9", style: { padding: "0 1rem" } },
};
export const LoggedInView = {
  type: "Fragment",
  children: [
    {
      type: "li",
      children: [
        {
          type: "Link",
          children: [
            { type: "i", props: { className: "ion-compose" } },
            " ",
            "New Article",
          ],
          props: {
            className: {
              $val: [
                { $getData: ["url"] },
                {
                  $ifElse: [
                    { $startsWith: ["/editor"] },
                    { $always: ["nav-link active"] },
                    { $always: ["nav-link"] },
                  ],
                },
              ],
            },
            to: "/editor",
          },
        },
      ],
      props: { className: "nav-item" },
    },
    {
      type: "li",
      children: [
        {
          type: "Link",
          children: [
            { type: "i", props: { className: "ion-gear-a" } },
            " ",
            "Settings",
          ],
          props: {
            className: {
              $val: [
                { $getData: ["url"] },
                {
                  $ifElse: [
                    { $equals: ["/settings"] },
                    { $always: ["nav-link active"] },
                    { $always: ["nav-link"] },
                  ],
                },
              ],
            },
            to: "/settings",
          },
        },
      ],
      props: { className: "nav-item" },
    },
    {
      type: "li",
      children: [
        {
          type: "Link",
          children: [
            {
              type: "img",
              props: {
                className: "user-pic",
                src: { $val: [{ $getData: ["user.image"] }] },
              },
            },
            { $val: [{ $getData: ["user.username"] }] },
          ],
          props: {
            className: {
              $val: [
                { $getData: ["url"] },
                {
                  $ifElse: [
                    { $startsWith: ["/profile"] },
                    { $always: ["nav-link active"] },
                    { $always: ["nav-link"] },
                  ],
                },
              ],
            },
            to: {
              $val: [
                { $always: ["/profile/"] },
                { $of: [] },
                { $append: [{ $val: [{ $getData: ["user.username"] }] }] },
                { $join: [""] },
              ],
            },
          },
        },
      ],
      props: { className: "nav-item" },
    },
  ],
};
export const LoggedOutView = {
  type: "Fragment",
  children: [
    {
      type: "li",
      children: [
        {
          type: "Link",
          children: "Sign In",
          props: {
            className: {
              $val: [
                { $getData: ["url"] },
                {
                  $ifElse: [
                    { $equals: ["/login"] },
                    { $always: ["nav-link active"] },
                    { $always: ["nav-link"] },
                  ],
                },
              ],
            },
            to: "/login",
          },
        },
      ],
      props: { className: "nav-item" },
    },
    {
      type: "li",
      children: [
        {
          type: "Link",
          children: "Sign Up",
          props: {
            className: {
              $val: [
                { $getData: ["url"] },
                {
                  $ifElse: [
                    { $equals: ["/register"] },
                    { $always: ["nav-link active"] },
                    { $always: ["nav-link"] },
                  ],
                },
              ],
            },
            to: "/register",
          },
        },
      ],
      props: { className: "nav-item" },
    },
  ],
};
export const Header = {
  type: "nav",
  children: [
    {
      type: "div",
      children: [
        {
          type: "Link",
          children: [{ $val: [{ $getData: ["appName"] }, { $toLower: [] }] }],
          props: { className: "navbar-brand", to: "/" },
        },
        {
          type: "ul",
          children: [
            {
              type: "li",
              children: [
                {
                  type: "Link",
                  children: "Home",
                  props: {
                    className: [
                      {
                        $val: [
                          { $getData: ["url"] },
                          {
                            $ifElse: [
                              { $equals: ["/"] },
                              { $always: ["nav-link active"] },
                              {
                                $ifElse: [
                                  { $equals: ["/feed"] },
                                  { $always: ["nav-link active"] },
                                  {
                                    $ifElse: [
                                      { $startsWith: ["/filter"] },
                                      { $always: ["nav-link active"] },
                                      { $always: ["nav-link"] },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    to: "/",
                  },
                },
              ],
              props: { className: "nav-item" },
            },
            {
              $val: [
                { $getToken: ["jwt"] },
                {
                  $ifElse: [
                    { $isEmpty: [] },
                    { $always: [{ type: "LoggedOutView" }] },
                    {
                      $always: [
                        {
                          type: "LoggedInView",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          props: { className: "nav navbar-nav pull-xs-right" },
        },
      ],
      props: { className: "container" },
    },
  ],
  props: { className: "navbar navbar-light" },
};
export const Tags = {
  type: "div",
  children: {
    $val: [
      { $getData: ["tags"] },
      {
        $ifElse: [
          { $isEmpty: [] },
          { $always: ["No tags are here... yet."] },
          {
            $map: [
              {
                $pipe: [
                  { $objOf: ["value"] },
                  { $objOf: ["props"] },
                  {
                    $mergeDeepRight: [
                      {
                        type: "Tag",
                        props: { className: "tag-default tag-pill" },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  props: { className: "tag-list" },
};
export const Banner = {
  type: "div",
  children: [
    {
      type: "div",
      children: [
        {
          type: "h1",
          children: [{ $val: [{ $getData: ["appName"] }, { $toLower: [] }] }],
          props: { className: "logo-font" },
        },
        { type: "p", children: ["A place to share your knowledge"] },
      ],
      props: { className: "container" },
    },
  ],
  props: { className: "banner" },
};
export const ForkMe = {
  type: "div",
  children: [
    {
      type: "div",
      props: {
        style: { background: "transparent", height: "66px", width: "100%" },
      },
    },
    {
      type: "a",
      children: [
        {
          type: "i",
          props: {
            className: "ion-social-github",
            style: { marginRight: "0.6rem" },
          },
        },
        "Fork on GitHub",
      ],
      props: {
        href: "https://www.github.com/rlee0/figtree-realworld-demo",
        rel: "noreferrer",
        style: {
          alignItems: "center",
          background: "linear-gradient(#485563, #29323c)",
          bottom: "0",
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          fontSize: "1.5rem",
          height: "66px",
          justifyContent: "center",
          lineHeight: "36px",
          position: "absolute",
          width: "100%",
          zIndex: 2,
        },
        target: "_blank",
      },
    },
  ],
};
export const Editor = {
  type: "div",
  children: [
    {
      type: "div",
      children: [
        {
          type: "div",
          children: [
            {
              type: "div",
              children: [
                { type: "ListErrors" },
                {
                  type: "fieldset",
                  children: [
                    {
                      type: "fieldset",
                      children: [
                        {
                          type: "input",
                          props: {
                            type: "text",
                            className: "form-control form-control-lg",
                            onChange: {
                              $pipe: [
                                { $get: ["target.value"] },
                                { $setData: ["draft.article.title"] },
                              ],
                            },
                            placeholder: "Article Title",
                            value: {
                              $val: [{ $getData: ["draft.article.title"] }],
                            },
                          },
                        },
                      ],
                      props: { className: "form-group" },
                    },
                    {
                      type: "fieldset",
                      children: [
                        {
                          type: "input",
                          props: {
                            type: "text",
                            className: "form-control",
                            onChange: {
                              $pipe: [
                                { $get: ["target.value"] },
                                { $setData: ["draft.article.description"] },
                              ],
                            },
                            placeholder: "What's this article about?",
                            value: {
                              $val: [
                                { $getData: ["draft.article.description"] },
                              ],
                            },
                          },
                        },
                      ],
                      props: { className: "form-group" },
                    },
                    {
                      type: "fieldset",
                      children: [
                        {
                          type: "textarea",
                          props: {
                            className: "form-control",
                            onChange: {
                              $pipe: [
                                { $get: ["target.value"] },
                                { $setData: ["draft.article.body"] },
                              ],
                            },
                            placeholder: "Write your article (in markdown)",
                            rows: 8,
                            value: {
                              $val: [{ $getData: ["draft.article.body"] }],
                            },
                          },
                        },
                      ],
                      props: { className: "form-group" },
                    },
                    {
                      type: "fieldset",
                      children: [
                        {
                          type: "input",
                          props: {
                            type: "text",
                            className: "form-control",
                            onChange: {
                              $pipe: [
                                { $get: ["target.value"] },
                                { $setData: ["draft.article.tag"] },
                              ],
                            },
                            onKeyUp: {
                              $pipe: [
                                {
                                  $when: [
                                    {
                                      $pipe: [
                                        { $get: ["key"] },
                                        { $equals: ["Enter"] },
                                      ],
                                    },
                                    {
                                      $pipe: [
                                        { $getData: ["draft.article.tagList"] },
                                        {
                                          $append: [
                                            {
                                              $val: [
                                                {
                                                  $getData: [
                                                    "draft.article.tag",
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                        { $uniq: [] },
                                        { $map: [{ $trim: [] }] },
                                        { $reject: [{ $isEmpty: [] }] },
                                        { $setData: ["draft.article.tagList"] },
                                        {
                                          $setData: ["draft.article.tag", null],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            placeholder: "Enter tags",
                            value: {
                              $val: [{ $getData: ["draft.article.tag"] }],
                            },
                          },
                        },
                        {
                          type: "span",
                          children: {
                            $val: [
                              { $getData: ["draft.article.tagList"] },
                              {
                                $mapObjIndexed: [
                                  {
                                    $pipe: [
                                      { $spread: [] },
                                      {
                                        $applySpec: [
                                          { props: { value: { $get: ["0"] } } },
                                        ],
                                      },
                                      {
                                        $mergeDeepRight: [
                                          {
                                            type: "CloseableTag",
                                            props: {
                                              className: "tag-default tag-pill",
                                            },
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                              { $values: [] },
                            ],
                          },
                          props: { className: "tag-list" },
                        },
                      ],
                      props: { className: "form-group" },
                    },
                    {
                      type: "button",
                      children: "Publish Article",
                      props: {
                        className: "btn btn-lg pull-xs-right btn-primary",
                        disabled: {
                          $val: [
                            { $getData: ["draft.article.title"] },
                            { $isEmpty: [] },
                            {
                              $or: [
                                {
                                  $val: [
                                    { $getData: ["draft.article.body"] },
                                    { $isEmpty: [] },
                                  ],
                                },
                              ],
                            },
                            {
                              $or: [
                                {
                                  $val: [
                                    { $getData: ["draft.article.description"] },
                                    { $isEmpty: [] },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                        onClick: {
                          $pipe: [
                            { $preventDefault: [] },
                            { $getData: ["draft.article"] },
                            {
                              $pickAll: [
                                [
                                  "title",
                                  "description",
                                  "body",
                                  "tagList",
                                  "slug",
                                ],
                              ],
                            },
                            {
                              $applySpec: [
                                {
                                  data: {
                                    article: { $pipe: [{ $omit: [["slug"]] }] },
                                  },
                                  method: {
                                    $ifElse: [
                                      {
                                        $pipe: [
                                          { $get: ["slug"] },
                                          { $isNil: [] },
                                        ],
                                      },
                                      { $always: ["post"] },
                                      { $always: ["put"] },
                                    ],
                                  },
                                  url: {
                                    $ifElse: [
                                      {
                                        $pipe: [
                                          { $get: ["slug"] },
                                          { $isNil: [] },
                                        ],
                                      },
                                      {
                                        $always: [
                                          "https://conduit.productionready.io/api/articles",
                                        ],
                                      },
                                      {
                                        $pipe: [
                                          { $get: ["slug"] },
                                          { $of: [] },
                                          {
                                            $prepend: [
                                              "https://conduit.productionready.io/api/articles/",
                                            ],
                                          },
                                          { $join: [""] },
                                        ],
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                            { $axios: [] },
                            {
                              $andThen: [
                                {
                                  $pipe: [
                                    { $get: ["data.article.slug"] },
                                    { $of: [] },
                                    { $prepend: ["#/article/"] },
                                    { $join: [""] },
                                    { $history: [] },
                                  ],
                                },
                              ],
                            },
                            {
                              $otherwise: [
                                {
                                  $pipe: [
                                    { $get: ["response.data.errors"] },
                                    { $setData: ["errors"] },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      },
                    },
                  ],
                },
              ],
              props: { className: "col-md-10 offset-md-1 col-xs-12" },
            },
          ],
          props: { className: "row" },
        },
      ],
      props: { className: "container page" },
    },
  ],
  props: { className: "editor-page" },
};
