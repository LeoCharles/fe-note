// 构造函数
function Person(name, age, career, work) {
  this.name = name
  this.age = age
  this.career = career
  this.work = work
}

// 工厂函数
function Factory(name, age, career) {
  let work
  switch (career) {
    case 'coder':
      work = ['写代码', '改Bug']
      break;
    case 'manager':
      work = ['开会', '写需求']
    case 'tester':
      work = ['测试代码']
    default:
      break;
  }

  return new Person(name, age, career, work)
}