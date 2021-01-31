---
title: Coursera Financial Markets
topic: Courses
---

Notes from [Coursera Financial Markets Course](https://www.coursera.org/learn/financial-markets-global).

<hr/>

_VaR_ - value at risk

- concept created after stock market crash after 1987
- quantify risk of investment or&nbsp;portfolio
- units $ for a given&nbsp;probability and time horizon

_Stress Tests_

- method of accessing risks to firms or&nbsp;portfolios
- see how firm will stand up under crisis


_Beta_ - measure of how a stock price relates to the aggregate market

- Market risk vs Idiosyncratic Risk (e.g. Steve Jobs Death)

  - Skatter Plot Regression Line - best fits data

    - Residual - distance between line and dot. Best fit = lowest residual sum for all dots

      - line equation y = mx + b.

        - m is slope (how much y changes for 1 unit increase in x)
        - y is return on stock, x is return on market, m as beta, b is alpha in finance

          - beta how much a stock co-moves with market (systematic risk)
  - Capital Asset Pricing Model:

    - variance of stock return = beta ^ 2 X \<variance of market return\> (systematic risk) + &nbsp;\<variance of residual in the regression\> (Idiosyncratic risk)
- Gold is negative beta. (negatively correlated to market returns)

  - Help offset market shock.&nbsp;

_Normal Distribution_ - Standard deviation 1,3

 ![](/assets/images/notes/coursera-financial-markets/Screen%20Shot%202018-03-19%20at%209.15.36%20AM.png)  

**Finance does not follow Normal Distribution— tends to have fat tails**

The standard deviation is √(p(1-p)/n)

_Central Limit Theorem_ - Averages of a large number of independently identically distributed shocks are approximately normally distributed

- Can fail if underlying shocks are fat tailed (e.g Black Swan) or lose their independence
- Cauchy Distribution - fat tail distribution

  - Can get tricked into thinking fairly stable w/ risk I understand
  - Stock price changes: -20%/+12% in single day


_Covariance_

- Example, 2 startups with .5 probability of 1 million income and .5 for 0 (mean .5)

  - COV = .25(.5\*.5) (both succeed) + .25(-.5\*.-5) (both failing) + .5(-.5\*.5) (one succeeds and the other doesn’t. twice as likely since 2 ways it could go) = 0

- Probably-weighted average.

- <font style="font-size: 14px;"><span style='font-size: 14px; font-family: "Helvetica Neue";'>If independent, COV is 0. Good as an investor.</span></font>
- <font style="font-size: 14px;"><span style='font-size: 14px; font-family: "Helvetica Neue";'><b>** Risk is determined by covariance!</b></span></font>

- <font style="font-size: 14px;"><span style='font-size: 14px; font-family: "Helvetica Neue";'>The market demands higher returns for the high beta stocks (high covariance with the market)</span></font>

-  ![](/assets/images/notes/coursera-financial-markets/Screen%20Shot%202018-03-19%20at%209.40.37%20AM.png)


_Insurance_

- Risk Pooling - source of value in insurance
-  ![](/assets/images/notes/coursera-financial-markets/Screen%20Shot%202018-03-19%20at%2011.20.05%20AM.png)
- Not always easy to make idea work b/c of:

  - Moral Hazard - take more risk b/c of insured
  - Selection Bias - insurance company can not see all risks e.g. Health Insurance attracts sick people

    - aka&nbsp;Adverse&nbsp;selection
    - Idea to guard against: For crop insurance, iInsure weather instead of crop
- McCarren Ferguson Act 1945 delegated insurance regulation to states.
- National Association of Insurance Commissioners (NAIC) creates standardized suggested laws.



_Capital Asset Pricing Model (CAPM)_


- Model of optimized&nbsp;portfolio. Asserts that every investor will hold that portfolio.
-  ![](/assets/images/notes/coursera-financial-markets/Screen%20Shot%202018-03-19%20at%204.08.27%20PM.png)
- Individuals should diversify, but it is difficult b/c have to buy fractional shares (use investment funds)

Credit Default Swap -&nbsp;

Short Sales - hold negative quantities of a stock.

- Can’t be part of optimal&nbsp;portfolio.



 ![](/assets/images/notes/coursera-financial-markets/Screen%20Shot%202018-03-19%20at%207.05.35%20PM.png)  



 ![](/assets/images/notes/coursera-financial-markets/Screen%20Shot%202018-03-19%20at%207.07.12%20PM.png)  



\*\* Gordan Growth Model - present value given future growth

- <font style="font-size: 14px;"><span style='font-size: 14px; font-family: "Helvetica Neue";'>PV = x / r - g, where x is output at time of purchase, r is rate of discount, g is growth rate.</span></font>

  - g must be less than r



Limited Liability

- investors in stock can never be pursued for mistakes of company
- works b/c investor overemphasizes risk (like inversely lottery ticket)
- allows diversified portfolio



Inflation Indexed Debt



Unidad de Fomento - Unit of Development (Chile 1967) - Unit of account tied to consumer price index



Representativeness heuristic - something seen in the past is representative of what we’ll see in the future

Random Walk Hypothesis - Each change is independent of previous changes and totally unforecastable



Efficient Market Hypothesis&nbsp;- revolution in the 50s



PDV of stock (Gordon Model): P = E/(r-g) or P/E = 1/(r-g)

- says P/E should be the same for every stock





## Behavioral Finance

- ppl want praise

Prospect Theory -&nbsp;revolution in the 90s

- <font style="font-size: 14px;"><span style='font-size: 14px; font-family: "Helvetica Neue";'>Old Theory: Utility Function</span></font>
- <font style="font-size: 14px;"><span style='font-size: 14px; font-family: "Helvetica Neue";'>New Theory: Value Function - Utility dependents on reference point</span></font>

  - People have&nbsp;skewed representations of&nbsp;probabilities:

    - People will not take small bets, but worry about small gains/losses.
    - People are willing to take large bets to get back to positive.
  -  ![](/assets/images/notes/coursera-financial-markets/Screen%20Shot%202018-03-21%20at%2011.19.23%20AM.png)
  - (0,0) is present time. Always a kink. Steeper curve for lose side— loss aversion.



Wishing Thinking Bias e.g. My team has higher chance of winning

Overconfidence in people e.g. Hiring a CEO

Cognitive Dissonance - mental conflict that occurs when one learns one’s beliefs are wrong i.e. avoidance behavior

- <font style="font-size: 14px;"><span style='font-size: 14px; font-family: "Helvetica Neue";'>Disposition Effect - Will ignore bad memories</span></font>



Mental Compartments -&nbsp;fun vs.&nbsp;retirement portfolios


Attention Anomalies - e.g. everyone paying attention to same stock == inflated prices

Anchoring - stock prices are anchored to past prices

Disjunction Effect - inability to make desicision&nbsp;that is contingent on future infomation

Newcomb’s paradox - People sometimes change their behavior when they learn about a prediction which has been made about the future.

Magical Thinking - i.e..&nbsp;superstitions


_Federal Funds Rate_ - shortest term interest rate (overnight), only banks

- Target rate by federal reserve
- EONIA (European Over Night Index Average) - European equivalent



Causes of Interest Rates

- Technological&nbsp;progress i.e. rate of progress is about 3%
- Time&nbsp;preferences i.e. people are natural impatient
- Advantages to roundaboutness e.g. pay an farmer to grow more so you can buy it



Compound Interest - (1 + r/n)^nt, where n is the number of times compounding per year

- Continuously: Pe^rt



Discount Bond

- <font style="font-size: 14px;"><span style='font-size: 14px; font-family: "Helvetica Neue";'>No coupon payments, buy at discount</span></font>
- Term T, Yield to Maturity (YTM) r: P = 1/(1 + r)^r, P \< 1



Present Discounted Value: PDV = 1/(1 + r) ^ n \*\* Important thing to calculate



Conventional Coupon Bond

- <font style="font-size: 14px;"><span style='font-size: 14px; font-family: "Helvetica Neue";'>Issued at par e.g. not discount</span></font>
-  ![](/assets/images/notes/coursera-financial-markets/Screen%20Shot%202018-03-25%20at%2012.41.26%20PM.png)
- Annual vs 6-month compounding



\*\* Market risk of bonds: coupon is fixed, but market price of bond fluctuates

 ![](/assets/images/notes/coursera-financial-markets/Screen%20Shot%202018-03-25%20at%2012.48.18%20PM.png)  



- <font style="font-size: 14px;"><span style='font-size: 14px; font-family: "Helvetica Neue";'>Consols like land</span></font>



Forward Rates -&nbsp;interest rates that represent&nbsp;future bond interest rates ???

-  ![](/assets/images/notes/coursera-financial-markets/Screen%20Shot%202018-03-25%20at%201.12.14%20PM.png)





Inflation and Interest Rates

- <font style="font-size: 14px;"><span style='font-size: 14px; font-family: "Helvetica Neue";'>Nominal rates (not taking into account inflation) are quoted in dollars</span></font>
- <font style="font-size: 14px;"><span style='font-size: 14px; font-family: "Helvetica Neue";'>Real rates are quoted market baskets</span></font>
- <font style="font-size: 14px;"><span style='font-size: 14px; font-family: "Helvetica Neue"; font-style: italic;'>Indexed bonds</span><span style='font-size: 14px; font-family: "Helvetica Neue";'> (TIPS) - pay in real rates</span></font>



Leveraging - putting more money in the asset than you have



Market Capitalization - price per share X number of shares of common stock (US 151% of GDP)



Common (equity vs Preferred Stock - preferred has a specified divined which does not grow through time; does not need to be paid

- can’t pay common&nbsp;dividend until preferred is paid



Stock dividend - pay dividend in stock

- <font style="font-size: 14px;"><span style='font-size: 14px; font-family: "Helvetica Neue";'>Dilution</span></font>



Share repurchase - same as&nbsp;dividend, but tax break



PDV of Expected Dividends&nbsp;(Gordon Model): P = E/(r-g) or P/E = 1/(r -g)

- Low P/E means r is high or g is low
- expected return on a stock&nbsp;is a function of it's covariance with the market

  - Riskier if covary with market
  - Stocks that covary should have high r and low P/E
- Value investing says invest in low P/E



Lintner Model of Dividends = dividends correspond to earnings



Inverted Yield Curves - short term interest rate are above long term rates

- Indicator of recession

  - Sometimes on purpose to combat inflation



Commercial Real Estate

Real Estate Partnerships

- Direct Participation Program (DPP)

  - Flow through vehicles
- For&nbsp;accredited investor
- Can’t be perpetual



Limited Partnership

- General partner runs the&nbsp;business and does not have limited liability (LL)

  - Must own at least 1%
- Limited partners are passive investors w/ LL



REITs &nbsp;(Real Estate Investment Trusts)&nbsp;

- <font style="font-size: 14px;"><span style='font-size: 14px; font-family: "Helvetica Neue";'>Restrictions prevent regular businesses from becoming REITs</span></font>

  - <font style="font-size: 14px;"><span style='font-size: 14px; font-family: "Helvetica Neue";'>e.g. Must pay out earnings</span></font>



Mortgages

**Good investment** : house price below construction cost in area on the up&nbsp;



30-year mortgage rate tracks 10-Year Treasury



CMO - Collateralized&nbsp;Mortgage Obligation - pool of mortgages sold to investors

- <font style="font-size: 14px;"><span style='font-size: 14px; font-family: "Helvetica Neue";'>traunches e.g. AAA</span></font>

  - <font style="font-size: 14px;"><span style='font-size: 14px; font-family: "Helvetica Neue";'>reached into higher traunches</span></font>



CDO - Collateralized&nbsp;Debt Obligation - same thing as CMO except w/ different forms of debt



MicroPrudential - regulation to protect one person

MacroPrudential&nbsp;- protect whole system



**5 levels of regulation**:

*1. Within-firm regulation*

  - Board of Directors

  - Tunneling - minority of&nbsp;shareholders steal money

  - More common in civil law countries

*2.  Regulation set by trade group*

*3. Local regulation*

*4. National regulation*

  - Civil Law = laws are only est. by legislature
  - Common Law = leg. and courts

*5. International regulation*

Public securities - approved by SEC, have to make quarterly filings

_FASB_ - Federal Accounting Standards Board

- <font style="font-size: 14px;"><span style='font-size: 14px; font-family: "Helvetica Neue";'>Defines GAAP</span></font>

  - <font style="font-size: 14px;"><span style='font-size: 14px; font-family: "Helvetica Neue";'>Net Income</span></font>
  - <font style="font-size: 14px;"><span style='font-size: 14px; font-family: "Helvetica Neue";'>Operating Income = revenue - cost of doing business</span></font>



Securities&nbsp;Investor&nbsp;Protection Corporation (SIPC) - like FDIC - protect account at brokers



Forward contract - contract to deliver at a future date (exercise date) at certain price (exercise price)

- Example: Farmer sells to warehouse
- Storage of grain is the hedger
- Can also be used with currency
- Problem: can’t get out of them, trust

  - Future’s market is way to overcome problems
- Like a pair of zero coupon bonds

  - Forward Rate reflects interest rates in 2 currencies



Forward Exchange Rate = Spot Exchange Rate \* (1 + \<interest rate currency 1\>)/(1 + \<interest rate currency 2\>)



Future contracts

- standardized retail product
- Rely on margin calls to guarantee performance
- Fair value = spot price \* (1 + r + s) where r is interest rate, s is storage cost



Options - used to manage risk e.g. put a floor on loses.

Call option - right to buy

Put option - right to sell

- Unlike Forward Contract, not bound to buy/sell



Exercise date - option expires

Exercise price - price at which buy/sell

Underly - underlying asset



Put-Call Parity Relation

- You don’t need put/calls because they are related through the put-call parity. Only for convenience.
- <font style="font-size: 14px;" face="Helvetica Neue"><span style='font-size: 14px; font-family: "Helvetica Neue";'>Price of Stock = Call Price + PDV Strike + PDV Dividends - Put Price</span></font>
- ![](/assets/images/notes/coursera-financial-markets/Screen%20Shot%202018-04-09%20at%206.02.41%20PM.png]





Interesting things to think about

No arbitrage means no sure profit. Any profit entails risk. Once option expires, risk expires. !!

- Do you see any $10 bills lying around?

When put options become&nbsp;expensive that is sign market is worried about a crash

- SKEW

Stop-loss order as an alternative to put option



Investment Banks



- Underwrite securities - manage process of new shares/debt
- Two Basic Kinds of Offerings

  - Bought deal - underwriter agrees to buy all unsold shares
  - Best efforts - deal collapses if shares are unsold





Glass-Steagal Act 1933

- created FDIC
- said can’t be both investment and commercial bank
- repealed in 1999 (Grahm-Leach Bill)



Closed-end fund - like Mutual Fund except buy individual funds



Inequality is due to unmanaged risk.



Human Capital



- Study risk management and finance
- Think about your positioning in history. How do I fit in to historical events happening right now? Rather than thinking about personal life cycle.
- Maintain human capital in changing world. Keep thinking about what skills you have will be important and needed by others under maybe different conditions
