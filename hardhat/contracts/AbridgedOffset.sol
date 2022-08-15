//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "./interfaces/IToucanPoolToken.sol";
import "./interfaces/IToucanCarbonOffsets.sol";

contract AbridgedOffset {
    using SafeERC20 for IERC20;

    address constant POOL_TOKEN = 0xD838290e877E0188a4A44700463419ED96c16107;
    address public contractRegistryAddress =
        0x263fA1c180889b3a3f46330F32a4a23287E99FC9;
    address public sushiRouterAddress =
        0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506;
    mapping(address => mapping(address => uint256)) public balances;

    event Redeemed(
        address who,
        address poolToken,
        address[] tco2s,
        uint256[] amounts
    );

    /**
     * @notice Retire carbon credits using the lowest quality (oldest) TCO2
     * tokens available by sending Toucan pool tokens, for example, BCT or NCT.
     *
     * This function:
     * 1. Redeems the pool token for the poorest quality TCO2 tokens available.
     * 2. Retires the TCO2 tokens.
     *
     * Note: The client must approve the pool token that is sent.
     *
     * user wants to use, for example, NCT or BCT.
     * @param _amountToOffset The amount of TCO2 to offset.
     *
     * @return tco2s An array of the TCO2 addresses that were redeemed
     * @return amounts An array of the amounts of each TCO2 that were redeemed
     */
    function autoOffsetUsingPoolToken(uint256 _amountToOffset) 
        public returns (address[] memory tco2s, uint256[] memory amounts) {
        // deposit pool token from user to this contract
        deposit(_amountToOffset);

        // redeem BCT / NCT for TCO2s
        (tco2s, amounts) = autoRedeem(_amountToOffset);

        // retire the TCO2s to achieve offset
        //autoRetire(tco2s, amounts);
    }

    /**
     * @notice Allow users to withdraw tokens they have deposited.
     */
    function withdraw(uint256 _amount) public {
        require(
            balances[msg.sender][POOL_TOKEN] >= _amount,
            "Insufficient balance"
        );

        IERC20(POOL_TOKEN).safeTransfer(msg.sender, _amount);
        balances[msg.sender][POOL_TOKEN] -= _amount;
    }

    /**
     * @notice Allow users to deposit BCT / NCT.
     * @dev Needs to be approved
     */
    function deposit(uint256 _amount) public {
        IERC20(POOL_TOKEN).safeTransferFrom(msg.sender, address(this), _amount);
        balances[msg.sender][POOL_TOKEN] += _amount;
    }

    /**
     * @notice Redeems the specified amount of NCT / BCT for TCO2.
     * @dev Needs to be approved on the client side
     * @param _amount Amount to redeem
     * @return tco2s An array of the TCO2 addresses that were redeemed
     * @return amounts An array of the amounts of each TCO2 that were redeemed
     */
    function autoRedeem(uint256 _amount)
        public
        returns (address[] memory tco2s, uint256[] memory amounts)
    {
        require(
            balances[msg.sender][POOL_TOKEN] >= _amount,
            "Insufficient NCT/BCT balance"
        );

        // instantiate pool token (NCT or BCT)
        IToucanPoolToken PoolTokenImplementation = IToucanPoolToken(POOL_TOKEN);

        // auto redeem pool token for TCO2; will transfer automatically picked TCO2 to this contract
        (tco2s, amounts) = PoolTokenImplementation.redeemAuto2(_amount);

        // update balances
        balances[msg.sender][POOL_TOKEN] -= _amount;
        uint256 tco2sLen = tco2s.length;
        for (uint256 index = 0; index < tco2sLen; index++) {
            balances[msg.sender][tco2s[index]] += amounts[index];
        }

        emit Redeemed(msg.sender, POOL_TOKEN, tco2s, amounts);
    }

    /**
     * @notice Retire the specified TCO2 tokens.
     * @param _tco2s The addresses of the TCO2s to retire
     * @param _amounts The amounts to retire from each of the corresponding
     * TCO2 addresses
     */
    function autoRetire(address[] memory _tco2s, uint256[] memory _amounts)
        public
    {
        uint256 tco2sLen = _tco2s.length;
        require(tco2sLen != 0, "Array empty");

        require(tco2sLen == _amounts.length, "Arrays unequal");

        uint256 i = 0;
        while (i < tco2sLen) {
            require(
                balances[msg.sender][_tco2s[i]] >= _amounts[i],
                "Insufficient TCO2 balance"
            );

            balances[msg.sender][_tco2s[i]] -= _amounts[i];

            IToucanCarbonOffsets(_tco2s[i]).retire(_amounts[i]);

            unchecked {
                ++i;
            }
        }
    }
}