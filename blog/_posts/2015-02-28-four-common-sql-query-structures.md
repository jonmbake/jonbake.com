---
layout: default
title: "Four Common SQL Query Structures"
tags:
  - sql
---

When starting out writing SQL queries, it can be difficult to understand exactly how to structure a query. SQL is **declarative** in nature, which allows one to quickly obtain a subset of relevant data. However, often times you will know the subset of data that you want, just not the SQL needed to obtain it. This posts is intended to arm you with some common query structures to make the process of getting to the data you want easier. The four query types that we will go over are:

1.  Correlated Sub-query
2.  Inline View
3.  Sub-query Factoring Clause
4.  Nested Selects

## Our Test Data

The example queries use two tables _Employee_ and _Address_. Employees have a name and manager, with manager being a foreign key to the _Employee_ table. _Address_ has _street_ and _city_ and a FK back to _Employee_.

The following SQL was used to create the tables and populate some data:

```
create table employee (
    id int not null primary key,
    name varchar(80),
    manager_id int
);

create table address (
    employee_id int,
    street varchar(80),
    city varchar(80)
);


insert into employee values(1, 'Jill', null);
insert into employee values(2, 'Alice', null);
insert into employee values(3, 'Jon', 1);
insert into employee values(4, 'Jim', 1);
insert into employee values(5, 'Beth', 2);

insert into address values(1, '324 Sycomore St.', 'Madison');
insert into address values(2, '123 Main St.', 'LaCrosse');
insert into address values(3, '478 Superior Ave', 'Chicago');
insert into address values(4, '7888 Park St', 'Fleming');
insert into address values(5, '99238 Hammersly Dr', 'Ersling');
```

## Correlated Sub-query

Correlated sub-queries are often used with an _Aggregate Function_ or the _Exists_ or _Not Exists_ sub-clauses to filter based on an attribute. For example, say we want to obtain all managers who manage more than one person. This is easy with a correlated sub-query and using the aggregate function _count_:

```
select
  m.name
from
  employee m
where
  1 < (
    select
      count(*)
    from
      employee e
    where
      --this is where we correlate back to the main query, hence the name
      m.id = e.manager_id
  )
;
```

## Inline View

Inline views are useful when you need to join to a view, but the view will not be useful outside of the context of query. If the view were to be useful in other queries, it makes sense to extract the inline view to a view.

Inline views are defined within the _from_ clause. Let’s say that we want to get a list of employees, their managers and the city that their manager is from. We can use an inline view to get employee(manager)/address.

```
select
  e.name,
  ma.name manager_name,
  ma.city manager_city
from
  --a view defined within the from clause
  (
    select
      e2.id,
      e2.name,
      a.city
    from
      employee e2
    join
      address a on (e2.id = a.employee_id)
    ) ma
join
  employee e on (ma.id = e.manager_id)
;
```

## Sub-query Factoring Clause

Like inline views, sub-query factoring clause lets you create “private views” only visible to the query. You should choose Sub-query Factoring when you need to join on the view multiple times. For example, say we want to also get the employee’s city. Notice we are joining _ea_ multiple times.

```
with ea as
(
  select
    e2.id,
    e2.manager_id,
    e2.name,
    a.city
  from
    employee e2
  join
    address a on (e2.id = a.employee_id)
)
select
  e.name employee_name,
  e.city employee_city,
  m.name manager_name,
  m.city manager_city
from
  ea e
join
  ea m on (e.manager_id = m.id)
;
```

## Nested Selects

One nice feature of SQL is that it allows for nested structures: views inside of queries, queries inside of other queries, selects inside of selects, etc. Often times you just need to obtain the values from a single column of a table. Instead of joining to the table, it is possible to use a nested select.

In this example, we are getting the city value for an employee using a _Nested Select_:

```
select
  e.name employee_name,
  (
    select
      a.city
    from
      address a
    where
      a.employee_id = e.id
   ) employee_city
from
  employee e
;
```

## Conclusion

Hopefully you learned something new. Learning common query structures such as the ones presented here will help to make you a SQL ninja (whatever that means).
