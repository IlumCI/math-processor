// Phase 3: Symbolic Math Parsing & Solving
import * as math from 'https://cdn.jsdelivr.net/npm/mathjs@11.8.0/lib/browser/math.js';

export class MathProcessor {
    constructor() {
        this.parser = math.parser();
        
        // EU and International Standards
        this.standards = {
            decimal: ',',
            thousands: '.',
            units: {
                temperature: '°C',
                length: 'm',
                speed: 'm/s',
                mass: 'kg'
            },
            notation: {
                multiplication: '·',
                division: '÷',
                squareRoot: '√',
                infinity: '∞',
                pi: 'π',
                euler: 'e',
                imaginary: 'i'
            }
        };

        // Add missing primary-color-dark variable
        this.colors = {
            primary: '#2c3e50',
            primaryDark: '#1a252f',
            secondary: '#3498db',
            background: '#f8f9fa',
            text: '#2c3e50',
            border: '#e9ecef',
            success: '#27ae60',
            error: '#e74c3c',
            warning: '#f39c12'
        };

        this.supportedOperations = {
            'algebraic': ['+', '-', '·', '÷', '^', '√'],
            'trigonometric': ['sin', 'cos', 'tan', 'asin', 'acos', 'atan'],
            'logarithmic': ['log', 'ln'],
            'matrix': ['det', 'inv', 'transpose'],
            'statistical': ['mean', 'median', 'std', 'variance']
        };

        // Specialized functions
        this.specialFunctions = {
            // Bessel functions
            bessel: {
                J: (n, x) => math.besselJ(n, x),
                Y: (n, x) => math.besselY(n, x),
                I: (n, x) => math.besselI(n, x),
                K: (n, x) => math.besselK(n, x)
            },
            // Special functions
            special: {
                gamma: (x) => math.gamma(x),
                erf: (x) => math.erf(x),
                erfc: (x) => math.erfc(x),
                zeta: (x) => math.zeta(x),
                beta: (x, y) => math.beta(x, y),
                factorial: (n) => math.factorial(n),
                binomial: (n, k) => math.binomial(n, k)
            },
            // Hyperbolic functions
            hyperbolic: {
                sinh: (x) => math.sinh(x),
                cosh: (x) => math.cosh(x),
                tanh: (x) => math.tanh(x),
                coth: (x) => math.coth(x),
                sech: (x) => math.sech(x),
                csch: (x) => math.csch(x)
            },
            // Inverse trigonometric functions
            inverseTrig: {
                asin: (x) => math.asin(x),
                acos: (x) => math.acos(x),
                atan: (x) => math.atan(x),
                acot: (x) => math.acot(x),
                asec: (x) => math.asec(x),
                acsc: (x) => math.acsc(x)
            }
        };

        // Complex mathematical notations
        this.complexNotations = {
            // Matrix notations
            matrix: {
                determinant: 'det',
                trace: 'tr',
                transpose: 'T',
                inverse: '-1',
                conjugate: '*'
            },
            // Vector notations
            vector: {
                dot: '·',
                cross: '×',
                norm: '||',
                angle: '∠'
            },
            // Set notations
            set: {
                element: '∈',
                subset: '⊂',
                properSubset: '⊊',
                superset: '⊃',
                properSuperset: '⊋',
                union: '∪',
                intersection: '∩',
                complement: '∁'
            },
            // Logic notations
            logic: {
                forall: '∀',
                exists: '∃',
                notExists: '∄',
                implies: '⇒',
                iff: '⇔',
                and: '∧',
                or: '∨',
                not: '¬'
            }
        };
    }

    parseExpression(expr) {
        try {
            // Pre-process expression to handle common math notations
            expr = this.preprocessExpression(expr);
            return math.parse(expr);
        } catch (error) {
            throw new Error(`Failed to parse expression: ${error.message}`);
        }
    }

    preprocessExpression(expr) {
        return expr
            // Handle EU decimal separator
            .replace(/(\d+),(\d+)/g, '$1.$2')
            // Handle EU thousands separator
            .replace(/(\d+)\.(\d{3})/g, '$1$2')
            // Handle implicit multiplication with proper symbol
            .replace(/(\d+)([a-zA-Z])/g, '$1·$2')
            // Handle fractions with proper division symbol
            .replace(/(\d+)\/(\d+)/g, '($1)÷($2)')
            // Handle square roots with proper symbol
            .replace(/√(\d+)/g, 'sqrt($1)')
            // Handle powers
            .replace(/(\d+)\^(\d+)/g, 'pow($1,$2)')
            // Handle scientific notation
            .replace(/(\d+)e(\d+)/g, '$1·10^$2')
            // Handle proper multiplication symbol
            .replace(/×/g, '·')
            // Handle proper division symbol
            .replace(/÷/g, '/')
            // Handle proper square root symbol
            .replace(/√/g, 'sqrt');
    }

    evaluateExpression(expr, scope = {}) {
        try {
            const node = this.parseExpression(expr);
            return node.evaluate(scope);
        } catch (error) {
            throw new Error(`Failed to evaluate expression: ${error.message}`);
        }
    }

    solveEquation(equation, type = 'algebraic') {
        try {
            const steps = [];
            let solution;

            switch (type) {
                case 'algebraic':
                    solution = this.solveAlgebraicEquation(equation, steps);
                    break;
                case 'trigonometric':
                    solution = this.solveTrigonometricEquation(equation, steps);
                    break;
                case 'exponential':
                    solution = this.solveExponentialEquation(equation, steps);
                    break;
                case 'logarithmic':
                    solution = this.solveLogarithmicEquation(equation, steps);
                    break;
                case 'differential':
                    solution = this.solveDifferentialEquation(equation, steps);
                    break;
                case 'integral':
                    solution = this.solveIntegralEquation(equation, steps);
                    break;
                case 'matrix':
                    solution = this.solveMatrixEquation(equation, steps);
                    break;
                case 'vector':
                    solution = this.solveVectorEquation(equation, steps);
                    break;
                case 'inequality':
                    solution = this.solveInequalityEquation(equation, steps);
                    break;
                case 'system':
                    solution = this.solveSystemEquation(equation, steps);
                    break;
                default:
                    throw new Error(`Unsupported equation type: ${type}`);
            }

            return {
                solution: solution,
                steps: steps,
                type: type,
                validation: this.validateSolution(equation, solution)
            };
        } catch (error) {
            throw new Error(`Error solving equation: ${error.message}`);
        }
    }

    detectEquationType(equation) {
        if (equation.includes('sin') || equation.includes('cos') || equation.includes('tan')) {
            return 'trigonometric';
        }
        if (equation.includes('^') || equation.includes('pow')) {
            const degree = this.getPolynomialDegree(equation);
            if (degree === 1) return 'linear';
            if (degree === 2) return 'quadratic';
            if (degree > 2) return 'polynomial';
        }
        if (equation.includes('log') || equation.includes('ln')) {
            return 'logarithmic';
        }
        if (equation.includes('e^') || equation.includes('exp')) {
            return 'exponential';
        }
        return 'linear';
    }

    getPolynomialDegree(equation) {
        const terms = equation.split(/[+\-]/);
        let maxDegree = 0;
        
        for (const term of terms) {
            if (term.includes('^')) {
                const degree = parseInt(term.split('^')[1]);
                maxDegree = Math.max(maxDegree, degree);
            }
        }
        
        return maxDegree;
    }

    solveLinearEquation(expr) {
        const node = this.parseExpression(expr);
        const solution = math.solve(node);
        return solution;
    }

    solveQuadraticEquation(expr) {
        const node = this.parseExpression(expr);
        const solution = math.solve(node);
        return solution;
    }

    solvePolynomialEquation(expr) {
        const node = this.parseExpression(expr);
        const solution = math.solve(node);
        return solution;
    }

    solveTrigonometricEquation(expr) {
        const node = this.parseExpression(expr);
        const solution = math.solve(node);
        return solution;
    }

    solveExponentialEquation(expr) {
        const node = this.parseExpression(expr);
        const solution = math.solve(node);
        return solution;
    }

    generateSolutionSteps(expr, solution, equationType) {
        const steps = [];
        
        // Add original equation with proper notation
        steps.push(`Original equation: $${this.formatWithProperNotation(expr.toString())}$`);
        
        // Add equation type
        steps.push(`Type: ${this.formatEquationType(equationType)}`);
        
        // Add solution steps based on equation type
        switch (equationType) {
            case 'linear':
                steps.push(...this.generateLinearSteps(expr, solution));
                break;
            case 'quadratic':
                steps.push(...this.generateQuadraticSteps(expr, solution));
                break;
            case 'polynomial':
                steps.push(...this.generatePolynomialSteps(expr, solution));
                break;
            case 'trigonometric':
                steps.push(...this.generateTrigonometricSteps(expr, solution));
                break;
            case 'exponential':
                steps.push(...this.generateExponentialSteps(expr, solution));
                break;
            default:
                if (Array.isArray(solution)) {
                    steps.push(`Solutions: $${solution.map(s => this.formatWithProperNotation(s.toString())).join(', ')}$`);
                } else {
                    steps.push(`Solution: $${this.formatWithProperNotation(solution.toString())}$`);
                }
        }
        
        return steps;
    }

    formatWithProperNotation(expr) {
        return expr
            .replace(/\*/g, this.standards.notation.multiplication)
            .replace(/\//g, this.standards.notation.division)
            .replace(/sqrt/g, this.standards.notation.squareRoot)
            .replace(/infinity/g, this.standards.notation.infinity)
            .replace(/pi/g, this.standards.notation.pi)
            .replace(/e\^/g, this.standards.notation.e + '^')
            .replace(/i/g, this.standards.notation.imaginary);
    }

    formatEquationType(type) {
        const types = {
            'linear': 'Linear Equation',
            'quadratic': 'Quadratic Equation',
            'polynomial': 'Polynomial Equation',
            'trigonometric': 'Trigonometric Equation',
            'exponential': 'Exponential Equation',
            'logarithmic': 'Logarithmic Equation'
        };
        return types[type] || type;
    }

    generateLinearSteps(expr, solution) {
        const steps = [];
        steps.push('1. Isolate the variable term');
        steps.push('2. Divide both sides by the coefficient');
        steps.push(`Solution: $x = ${this.formatWithProperNotation(solution.toString())}$`);
        return steps;
    }

    generateQuadraticSteps(expr, solution) {
        const steps = [];
        steps.push('1. Write in standard form: $ax^2 + bx + c = 0$');
        steps.push('2. Apply the quadratic formula: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$');
        steps.push(`Solutions: $x = ${solution.map(s => this.formatWithProperNotation(s.toString())).join(', ')}$`);
        return steps;
    }

    generatePolynomialSteps(expr, solution) {
        const steps = [];
        steps.push('1. Write in standard form');
        steps.push('2. Factor the polynomial');
        steps.push('3. Set each factor equal to zero');
        steps.push(`Solutions: $x = ${solution.map(s => s.toString()).join(', ')}$`);
        return steps;
    }

    generateTrigonometricSteps(expr, solution) {
        const steps = [];
        steps.push('1. Isolate the trigonometric function');
        steps.push('2. Apply inverse trigonometric function');
        steps.push('3. Consider periodicity');
        steps.push(`Solutions: $x = ${solution.map(s => s.toString()).join(', ')}$`);
        return steps;
    }

    generateExponentialSteps(expr, solution) {
        const steps = [];
        steps.push('1. Isolate the exponential term');
        steps.push('2. Take the natural logarithm of both sides');
        steps.push('3. Solve for the variable');
        steps.push(`Solution: $x = ${solution.toString()}$`);
        return steps;
    }

    validateSolution(expr, solution) {
        try {
            if (Array.isArray(solution)) {
                return solution.every(sol => {
                    const scope = { x: sol };
                    const result = this.evaluateExpression(expr, scope);
                    return math.isZero(result);
                });
            } else {
                const scope = { x: solution };
                const result = this.evaluateExpression(expr, scope);
                return math.isZero(result);
            }
        } catch (error) {
            return false;
        }
    }

    // Additional utility methods
    simplifyExpression(expr) {
        try {
            const node = this.parseExpression(expr);
            return node.simplify().toString();
        } catch (error) {
            throw new Error(`Failed to simplify expression: ${error.message}`);
        }
    }

    factorExpression(expr) {
        try {
            const node = this.parseExpression(expr);
            return node.factor().toString();
        } catch (error) {
            throw new Error(`Failed to factor expression: ${error.message}`);
        }
    }

    expandExpression(expr) {
        try {
            const node = this.parseExpression(expr);
            return node.expand().toString();
        } catch (error) {
            throw new Error(`Failed to expand expression: ${error.message}`);
        }
    }

    formatNumber(number, options = {}) {
        const {
            precision = 2,
            useEUFormat = true
        } = options;

        if (useEUFormat) {
            return number.toFixed(precision)
                .replace('.', ',')
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        }
        return number.toFixed(precision);
    }

    convertUnit(value, fromUnit, toUnit, unitType) {
        const unitInfo = this.standards.units[unitType];
        if (!unitInfo) throw new Error(`Unsupported unit type: ${unitType}`);

        // Convert to base unit first
        let baseValue;
        if (typeof unitInfo.conversion[fromUnit] === 'function') {
            baseValue = unitInfo.conversion[fromUnit](value);
        } else {
            baseValue = value * unitInfo.conversion[fromUnit];
        }

        // Convert from base unit to target unit
        if (typeof unitInfo.conversion[toUnit] === 'function') {
            return unitInfo.conversion[toUnit](baseValue);
        } else {
            return baseValue / unitInfo.conversion[toUnit];
        }
    }

    formatUnit(value, unit, unitType) {
        const unitInfo = this.standards.units[unitType];
        if (!unitInfo) throw new Error(`Unsupported unit type: ${unitType}`);

        return `${this.formatNumber(value)} ${unit}`;
    }

    // Type-specific solving methods with step-by-step solutions
    solveAlgebraicEquation(equation, steps) {
        steps.push('1. Original equation: ' + equation);
        
        // Parse the equation
        const parsed = this.parseExpression(equation);
        steps.push('2. Parsed expression: ' + parsed.toString());
        
        // Simplify the expression
        const simplified = this.simplifyExpression(parsed);
        steps.push('3. Simplified expression: ' + simplified.toString());
        
        // Solve for variables
        const solution = this.solveForVariables(simplified);
        steps.push('4. Solution: ' + solution.toString());
        
        return solution;
    }

    solveTrigonometricEquation(equation, steps) {
        steps.push('1. Original trigonometric equation: ' + equation);
        
        // Convert to standard form
        const standardForm = this.convertToStandardForm(equation);
        steps.push('2. Standard form: ' + standardForm);
        
        // Apply trigonometric identities
        const simplified = this.applyTrigonometricIdentities(standardForm);
        steps.push('3. After applying identities: ' + simplified);
        
        // Solve the simplified equation
        const solution = this.solveSimplifiedTrigonometric(simplified);
        steps.push('4. Solution: ' + solution);
        
        return solution;
    }

    // Add similar methods for other equation types...

    // Preview functionality
    generatePreview(equation, type) {
        try {
            // Parse the equation
            const parsed = this.parseExpression(equation);
            
            // Generate LaTeX representation
            const latex = this.generateLaTeX(parsed);
            
            // Generate simplified form
            const simplified = this.simplifyExpression(parsed);
            
            // Generate domain information
            const domain = this.getDomain(parsed);
            
            return {
                latex: latex,
                simplified: simplified.toString(),
                domain: domain,
                type: type,
                isValid: this.validateEquation(equation, type)
            };
        } catch (error) {
            return {
                error: error.message,
                isValid: false
            };
        }
    }

    // Helper methods for preview
    generateLaTeX(expression) {
        // Convert expression to LaTeX format
        return expression.toTex();
    }

    getDomain(expression) {
        // Analyze expression to determine domain
        const domain = {
            real: true,
            complex: false,
            restrictions: []
        };

        // Check for division by zero
        if (expression.toString().includes('/')) {
            domain.restrictions.push('Denominator cannot be zero');
        }

        // Check for square roots
        if (expression.toString().includes('sqrt')) {
            domain.restrictions.push('Radicand must be non-negative');
        }

        // Check for logarithms
        if (expression.toString().includes('log')) {
            domain.restrictions.push('Argument must be positive');
        }

        return domain;
    }

    // Enhanced validation
    validateEquation(equation, type) {
        const validation = {
            isValid: true,
            errors: [],
            warnings: []
        };

        // Basic syntax validation
        if (!this.validateSyntax(equation)) {
            validation.isValid = false;
            validation.errors.push('Invalid syntax');
        }

        // Type-specific validation
        switch (type) {
            case 'algebraic':
                this.validateAlgebraicEquation(equation, validation);
                break;
            case 'trigonometric':
                this.validateTrigonometricEquation(equation, validation);
                break;
            case 'exponential':
                this.validateExponentialEquation(equation, validation);
                break;
            case 'logarithmic':
                this.validateLogarithmicEquation(equation, validation);
                break;
            case 'differential':
                this.validateDifferentialEquation(equation, validation);
                break;
            case 'integral':
                this.validateIntegralEquation(equation, validation);
                break;
            case 'matrix':
                this.validateMatrixEquation(equation, validation);
                break;
            case 'vector':
                this.validateVectorEquation(equation, validation);
                break;
            case 'inequality':
                this.validateInequalityEquation(equation, validation);
                break;
            case 'system':
                this.validateSystemEquation(equation, validation);
                break;
        }

        return validation;
    }

    // Type-specific validation methods
    validateAlgebraicEquation(equation, validation) {
        // Check for balanced parentheses
        if (!this.checkBalancedParentheses(equation)) {
            validation.isValid = false;
            validation.errors.push('Unbalanced parentheses');
        }

        // Check for valid operators
        const operators = equation.match(/[+\-*/^]|sqrt/g) || [];
        for (const op of operators) {
            if (!this.isValidOperator(op)) {
                validation.isValid = false;
                validation.errors.push(`Invalid operator: ${op}`);
            }
        }

        // Check for undefined variables
        const variables = this.extractVariables(equation);
        for (const variable of variables) {
            if (!this.isValidVariable(variable)) {
                validation.isValid = false;
                validation.errors.push(`Invalid variable: ${variable}`);
            }
        }
    }

    // Add similar validation methods for other equation types...

    // Utility methods
    checkBalancedParentheses(expression) {
        let count = 0;
        for (let char of expression) {
            if (char === '(') count++;
            if (char === ')') count--;
            if (count < 0) return false;
        }
        return count === 0;
    }

    isValidOperator(operator) {
        const validOperators = ['+', '-', '*', '/', '^', 'sqrt'];
        return validOperators.includes(operator);
    }

    isValidVariable(variable) {
        return /^[a-zA-Z][a-zA-Z0-9]*$/.test(variable);
    }

    extractVariables(expression) {
        return expression.match(/[a-zA-Z][a-zA-Z0-9]*/g) || [];
    }
} 