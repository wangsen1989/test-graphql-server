## 运行项目:
### `yarn`
### `yarn start`
### `yarn server`
---

结论:  v3 使用 typePolicies 后, 可以根据资源找到缓存. 但之前缓存的资源必须有 id 或 _id, getCacheKey 里的对象也必须传该资源的 id.
缺点:  要实现这样的缓存, 需要后端改造该资源的 resolver, 给资源加上一个唯一 id. 前后端的 Graphql 语句声明都要加上该 id.
